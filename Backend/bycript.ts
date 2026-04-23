import bcrypt from "bcryptjs";

async function generate() {
  const password = "Test1234";
  const hash = await bcrypt.hash(password, 12);

  console.log("PASSWORD:", password);
  console.log("HASH:", hash);
}

generate();