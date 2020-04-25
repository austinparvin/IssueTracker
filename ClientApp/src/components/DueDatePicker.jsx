import React, { useState } from 'react'
import DatePicker from 'reactstrap-datepicker'

const DueDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date())
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      showTimeSelect
      minDate={subDays(new Date(), 0)}
      minTime={setHours(setMinutes(new Date(), 0), 0)}
      maxTime={setHours(setMinutes(new Date(), 1), 17)}
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  )
}

export default DueDatePicker
