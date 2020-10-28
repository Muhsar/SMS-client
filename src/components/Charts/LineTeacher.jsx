import React from 'react'
import { Line } from 'react-chartjs-2'
import jwt_decode from 'jwt-decode';
const decode = localStorage.token ? jwt_decode(localStorage.token) : null
export const TeacherLineChart=({
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
        data: students.length ? students.map(student=>{
        return(  
          (student.fees-student.amountPaid)
        )
        }) : null,
        borderColor: ['#ff5630'],
        backgroundColor: ['#ffddd6'],
        pointBackgroundColor: '#ff5630',
        pointBorderColor: '#ff5630'
      },
      {
        label: 'Paid',
        data:students.length ? students.map(student=>{
        return(  
          student.amountPaid
        )
        }) : null,
        borderColor: ['#36b37e'],
        backgroundColor: ['#d7f0e5'],
        pointBackgroundColor: '#36b37e',
        pointBorderColor: '#36b37e'
      }
    ]
  }

  const options = {
    title: {
      display: true,
      text: 'Line Chart'
    }
  }

  return <Line data={data} options={options} />
}

export default TeacherLineChart