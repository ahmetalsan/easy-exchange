import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import styles from './CustomDropdown.module.scss'

export type Option = {
  label: string
  value: string
  flag: string
}

type CustomDropdownProps = {
  options: Option[]
  value: string
  onChange: (option: { label: string; value: string; flag: string }) => void
}

const CustomDropdown = ({ options, value, onChange }: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSelectOption = (option: Option) => {
    onChange(option)
    setIsOpen(false)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const selectedOption = options.find((option) => option.value === value)

  return (
    <div className={styles.customDropdown} ref={dropdownRef}>
      <div className={styles.dropdownSelected} onClick={handleToggleDropdown}>
        {selectedOption && (
          <>
            <Image width="35" height="35" src={selectedOption.flag} alt={selectedOption.label} />
            <span>{selectedOption.label}</span>
          </>
        )}
        <div className={styles.dropdownIcon}>
          <i></i>
        </div>
      </div>
      {isOpen && (
        <div className={styles.dropdownList}>
          {options.map((option, index) => (
            <div key={index} className={styles.dropdownItem} onClick={() => handleSelectOption(option)}>
              <Image width="35" height="35" src={option.flag} alt={option.label} />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomDropdown
