import ldap, { Client, SearchEntry, SearchOptions } from "ldapjs";
import { config } from "../config";

// Tipo para los datos del usuario obtenidos de LDAP
export interface LdapUser {
  username: string;
  email: string;
  name: string;
  dn: string;
}

// Verificar si LDAP está habilitado
export const isLdapEnabled = (): boolean => {
  return config.ldap.enabled;
};

// Reemplazar placeholder en el filtro de búsqueda
const replaceFilterPlaceholder = (filter: string, username: string): string => {
  return filter.replace(/\{\{username\}\}/g, username);
};

// Autenticar usuario contra el directorio LDAP
export const authenticateWithLdap = async (username: string, password: string): Promise<LdapUser | null> => {
  // Si LDAP no está habilitado, retornar null
  if (!config.ldap.enabled) {
    console.log("LDAP deshabilitado, saltando autenticación LDAP");
    return null;
  }

  // Verificar que tenemos los parámetros mínimos configurados
  if (!config.ldap.url || !config.ldap.baseDn) {
    console.warn("LDAP configurado pero faltan parámetros requeridos (url, baseDn)");
    return null;
  }

  return new Promise<LdapUser | null>((resolve) => {
    const client: Client = ldap.createClient({
      url: config.ldap.url,
      // Timeout para conexión
      connectTimeout: 5000,
      // Timeout para operaciones
      timeout: 10000,
    });

    client.on("error", (err: Error) => {
      console.error("Error de conexión LDAP:", err.message);
      resolve(null);
    });

    // Intentar bind anónimo o con credenciales de admin
    const bindDn = config.ldap.bindDn || undefined;
    const bindPassword = config.ldap.bindPassword || undefined;

    client.bind(bindDn || "", bindPassword || "", (bindErr: Error | null) => {
      if (bindErr) {
        console.error("Error en bind LDAP:", bindErr.message);
        client.destroy();
        resolve(null);
        return;
      }

      // Buscar usuario en el directorio
      const searchFilter = replaceFilterPlaceholder(config.ldap.searchFilter, username);
      
      const searchOptions: SearchOptions = {
        filter: searchFilter,
        scope: "sub",
        attributes: [config.ldap.usernameAttribute, config.ldap.emailAttribute, config.ldap.nameAttribute],
      };

      client.search(config.ldap.baseDn, searchOptions, (searchErr: Error | null, res) => {
        if (searchErr) {
          console.error("Error en búsqueda LDAP:", searchErr.message);
          client.destroy();
          resolve(null);
          return;
        }

        let userEntry: SearchEntry | null = null;

        res.on("searchEntry", (entry: SearchEntry) => {
          userEntry = entry;
        });

        res.on("error", (err: Error) => {
          console.error("Error en resultado de búsqueda LDAP:", err.message);
          client.destroy();
          resolve(null);
        });

        // Procesar resultado después de un timeout
        setTimeout(() => {
          if (!userEntry) {
            console.log("Usuario no encontrado en LDAP:", username);
            client.destroy();
            resolve(null);
            return;
          }

          // Extraer atributos
          const pojo = userEntry.pojo;
          const attributes = pojo.attributes || [];
          
          const getAttr = (name: string): string => {
            const attr = attributes.find((a) => a.type.toLowerCase() === name.toLowerCase());
            return attr?.values?.[0] || "";
          };

          const userDn = getAttr("dn") || username;
          const ldapUsername = getAttr(config.ldap.usernameAttribute) || username;
          const ldapEmail = getAttr(config.ldap.emailAttribute) || `${username}@${config.ldap.baseDn.split(",")[0]?.replace("dc=", "") || "local"}`;
          const ldapName = getAttr(config.ldap.nameAttribute) || username;

          // Intentar bind con las credenciales del usuario para verificar contraseña
          client.bind(userDn, password, (authErr: Error | null) => {
            client.destroy();

            if (authErr) {
              console.log("Contraseña LDAP inválida para:", username);
              resolve(null);
              return;
            }

            // Autenticación exitosa
            console.log("Autenticación LDAP exitosa para:", username);
            resolve({
              username: ldapUsername,
              email: ldapEmail,
              name: ldapName,
              dn: userDn,
            });
          });
        }, 500);
      });
    });
  });
};

// Buscar usuario en LDAP sin autenticar (para obtener información)
export const searchLdapUser = async (username: string): Promise<LdapUser | null> => {
  if (!config.ldap.enabled || !config.ldap.url || !config.ldap.baseDn) {
    return null;
  }

  return new Promise<LdapUser | null>((resolve) => {
    const client: Client = ldap.createClient({
      url: config.ldap.url,
      connectTimeout: 5000,
      timeout: 10000,
    });

    client.on("error", (err: Error) => {
      console.error("Error de conexión LDAP:", err.message);
      resolve(null);
    });

    // Bind anónimo o con admin
    const bindDn = config.ldap.bindDn || undefined;
    const bindPassword = config.ldap.bindPassword || undefined;

    client.bind(bindDn || "", bindPassword || "", (bindErr: Error | null) => {
      if (bindErr) {
        console.error("Error en bind LDAP:", bindErr.message);
        client.destroy();
        resolve(null);
        return;
      }

      const searchFilter = replaceFilterPlaceholder(config.ldap.searchFilter, username);
      
      const searchOptions: SearchOptions = {
        filter: searchFilter,
        scope: "sub",
        attributes: [config.ldap.usernameAttribute, config.ldap.emailAttribute, config.ldap.nameAttribute],
      };

      client.search(config.ldap.baseDn, searchOptions, (searchErr: Error | null, res) => {
        if (searchErr) {
          console.error("Error en búsqueda LDAP:", searchErr.message);
          client.destroy();
          resolve(null);
          return;
        }

        let userEntry: SearchEntry | null = null;

        res.on("searchEntry", (entry: SearchEntry) => {
          userEntry = entry;
        });

        res.on("error", (err: Error) => {
          console.error("Error en resultado de búsqueda LDAP:", err.message);
          client.destroy();
          resolve(null);
        });

        setTimeout(() => {
          if (!userEntry) {
            client.destroy();
            resolve(null);
            return;
          }

          const pojo = userEntry.pojo;
          const attributes = pojo.attributes || [];
          
          const getAttr = (name: string): string => {
            const attr = attributes.find((a) => a.type.toLowerCase() === name.toLowerCase());
            return attr?.values?.[0] || "";
          };

          resolve({
            username: getAttr(config.ldap.usernameAttribute) || username,
            email: getAttr(config.ldap.emailAttribute),
            name: getAttr(config.ldap.nameAttribute),
            dn: getAttr("dn") || username,
          });
        }, 500);
      });
    });
  });
};

