"use client"

import * as React from "react"
import { format, parseISO } from "date-fns"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({
  value,
  onChange,
  className,
  placeholder = "MM/YYYY"
}: {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
}) {
  const date = value ? parseISO(value) : new Date()
  const [currentYear, setCurrentYear] = React.useState(date.getFullYear())
  const [isOpen, setIsOpen] = React.useState(false)

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]

  const handleMonthSelect = (monthIdx: number) => {
    // Format to yyyy-MM-01 so DB compatibility is maintained
    const newDate = new Date(currentYear, monthIdx, 1)
    onChange(format(newDate, "yyyy-MM-dd"))
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          {value ? format(parseISO(value), "MM/yyyy") : <span>{placeholder}</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" align="start">
        <div className="flex items-center justify-between pb-4">
            <Button variant="outline" className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100" onClick={() => setCurrentYear(y => y - 1)}>
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium">{currentYear}</div>
            <Button variant="outline" className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100" onClick={() => setCurrentYear(y => y + 1)}>
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
        <div className="grid grid-cols-3 gap-2">
            {months.map((month, idx) => {
                const isSelected = value && parseISO(value).getFullYear() === currentYear && parseISO(value).getMonth() === idx
                return (
                    <Button 
                        key={month} 
                        variant={isSelected ? "default" : "ghost"} 
                        className="h-9 w-full text-sm"
                        onClick={() => handleMonthSelect(idx)}
                    >
                        {month}
                    </Button>
                )
            })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
