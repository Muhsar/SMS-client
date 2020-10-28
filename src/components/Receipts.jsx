import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import jwt_decode from 'jwt-decode'
import { 
    studentDetail,
  getReceipt,
  schoolData
   } from '../actions/actions';
import TopNav from './TopNav';
class Receipts extends Component {
    componentDidMount=()=>{
        const decode = jwt_decode(localStorage.token)
        this.props.studentDetail(decode.student_id)
        this.props.getReceipt(decode.student_id)
        this.props.schoolData(decode.school_id)
      }

    render() {
        const {student} = this.props.student
        const {receipt} = this.props.receipt
        const {school} = this.props.school
        return (
            <div className="main-content position-relative">
                <TopNav/>
            <div class="page-content">
                {
      receipt.length ? receipt.map(receipt=>{
        return(
          <div class="card hover-shadow-lg align-content-center">
              <div class="card-header border-0">
                <div class="row align-items-center">
                <div class="media mt-4 align-items-center mx-auto">
                
                  <img alt="" src={school.logo} class="avatar avatar-lg"/>
                  <div class="media-body pl-3">
                    <div class="text-lg text-center my-0">{school.schoolName}</div>
                  </div>
                </div>
                </div>
              </div>
              <div class="card-body pt-0">
                <div class="p-3 border border-dashed">
                  
              <div class="row align-items-center">
                <div class="media mt-4 align-items-center col">
                {
                  student.image==='no image' ? 
                  <div className='bg-primary avatar rounded-circle avatar-lg'>
                  {student.surname.slice(0,1)} {student.name.slice(0,1)}
                  </div>
                  : 
                  <img alt="" src={student.image} class="avatar avatar-lg"/>
                }
                  <div class="media-body pl-3">
                    <div class="text-lg my-0">{student.surname} {student.name}</div>
                  </div>
                </div>
                
                  <div class="col text-muted font-weight-600 text-center">School Fee: #{receipt.fees}</div>
                </div>
                  <div class="row align-items-center mt-3">
                    <div class="col-6 text-center">
                      <h6 class="mb-0">#{receipt.paidAmount}</h6>
                      <span class="text-sm text-muted">Amount Paid</span>
                    </div>
                    <div class="col-6 text-center">
                      <h6 class="mb-0">{receipt.day}-{receipt.month}-{receipt.year}</h6>
                      <span class="text-sm text-muted">Date</span>
                    </div>
                  </div>
                  <div class="row align-items-center mt-3">
                    <div class="col-6 text-center">
                      <h6 class="mb-0">#{receipt.amountPaid}</h6>
                      <span class="text-sm text-muted">Total Amount Paid</span>
                    </div>
                    <div class="col-6 text-center">
                      <h6 class="mb-0">#{receipt.fees - receipt.amountPaid}</h6>
                      <span class="text-sm text-muted">Amount Left</span>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
        )
      })
      : null
    }
            </div>
            </div>

        )
    }
}


Receipts.propTypes = {
    studentDetail:PropTypes.func.isRequired,
    getReceipt: PropTypes.func.isRequired,
    receipt: PropTypes.object.isRequired,
    school: PropTypes.object.isRequired,
    schoolData: PropTypes.func.isRequired,
  }
  const mapStateToProps= state => {
      return{
        student:state.student,
        receipt:state.receipt,
        school:state.school
      }
  };
  export default connect(mapStateToProps,{
     studentDetail,
  getReceipt,
  schoolData
})(Receipts)
