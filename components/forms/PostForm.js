import {useForm} from 'react-hook-form'
import DatePicker from "react-datepicker"
import {useEffect, useState} from 'react'

const PostForm = ({onSubmit, initialData = {}}) => {
    const [startDate, setStartDate] = useState(null)
    const {handleSubmit, register, setValue} = useForm({defaultValues: initialData})

    useEffect(() => {
        register({name: 'startDate'})
    }, [register])

    useEffect(() => {
        const {startDate} = initialData
        if (startDate) {
            setStartDate(new Date(parseInt(startDate, 10)))
        }
    }, [initialData])

    const handleDateChange = (dateType, setDate) => date => {
        setValue(dateType, (date && new Date(date.setHours(0, 0, 0, 0)).toISOString()) || date)
        setDate(date)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    ref={register}
                    name="title"
                    type="text"
                    className="form-control"
                    id="title"/>
            </div>
            <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                    ref={register}
                    name="content"
                    rows="5"
                    className="form-control"
                    id="content">
                </textarea>
            </div>
            <div className="form-group">
                <label htmlFor="street">Start Date</label>
                <div>
                    <DatePicker
                        showYearDropdown
                        selected={startDate}
                        onChange={handleDateChange('startDate', setStartDate)}
                    />
                </div>
            </div>
            <button
                type="submit"
                className="btn btn-primary mb-3">
                Submit
            </button>
        </form>
    )
}

export default PostForm
