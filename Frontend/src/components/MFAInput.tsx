import { useRef } from "react"

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function MFAInput({ value, onChange }: Props) {

  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, digit: string) => {

    if (!/^[0-9]?$/.test(digit)) return

    const newValue = value.split("")
    newValue[index] = digit

    const code = newValue.join("")
    onChange(code)

    if (digit && inputs.current[index + 1]) {
      inputs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {

    if (e.key === "Backspace" && !value[index] && inputs.current[index - 1]) {
      inputs.current[index - 1]?.focus()
    }

  }

  return (

    <div className="flex justify-center gap-3">

      {[...Array(6)].map((_, i) => (

        <input
          key={i}
          ref={(el) => {inputs.current[i] = el}}
          type="text"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-12 h-12 text-center text-xl border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

      ))}

    </div>

  )

}