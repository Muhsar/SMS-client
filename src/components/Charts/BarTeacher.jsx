import React from 'react'
import { Bar } from 'react-chartjs-2'
import jwt_decode from 'jwt-decode';
const decode = localStorage.token ? jwt_decode(localStorage.token) : null
export const TeacherBarChart=({
  students
})=>{
  const data = {
    labels: students.length ? students.map(student=>{
    return(  
      [(student.surname+' '+student.name)]
    )
    }) : null,
    datasets: [
      {
        label: 'Debt',
        data:students.length ? students.map(student=>
          (Number(student.fees)-Number(student.amountPaid))
        ) : null,
        borderColor: students.length ? students.map(student=>['#ff5630']) : null,
        backgroundColor:students.length ? students.map(student=>['#ffddd6']) : null
      },
      {
        label: 'Paid',
        data:students.length ? students.map(student=>
          student.amountPaid
        ) : null,
        borderColor:students.length ? students.map(student=>'#36b37e') : null,
        backgroundColor:students.length ? students.map(student=>'#d7f0e5') : null
      }
    ]
  }

  const options = {
    title: {
      display: true,
      text: 'Bar Chart'
    }
  }
  return <Bar data={data} options={options} />
}

export default TeacherBarChart