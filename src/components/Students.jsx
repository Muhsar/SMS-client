import React, { Component } from 'react'
import { StudentCards, StudentListHeader, StudentReceipt } from './utilities/Cards';
import { StudentRegistration } from './utilities/RegisterModal';
import { StudentPage } from './utilities/Titles';
import { StudentList } from './utilities/Tables';
import $ from 'jquery'
import kR from './upload.png'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import {connect} from 'react-redux'
import { OwnerServer } from '../servers';
import PropTypes from 'prop-types'
import { DebtorModal, ResultModal, StudentAttendance, UpdateStudent } from './utilities/UpdateModal';
import { addStudent,
  getClassBill,
 addStudentBill,
 updateStudent,
  studentDetail,
  deleteStudent,
  studentBillDetail,
  updateStudentBill,
  deleteStudentBill,
getStudents,
getReceipt,
firstTerm,
secondTerm,
thirdTerm,
addResult,
deleteResult,
getAttendance
 } from '../actions/actions';
import { StudentInfo } from './utilities/Details';
import { Link } from 'react-router-dom';
import TopNav from './TopNav';
class Students extends Component {
  state = {
    name:'',
    surname:'',
    clas:'',
    department:'',
    gender:'',
    religion:'',
    date:'',
    state:'',
    lga:'',
    address:'',
    pname:'',
    psurname:'',
    email:'',
    number:'',
    paddress:'',
    amountPaid:0,
    modal:false,
    up:false,
    info:false,
    classChange:false,
    image: 'no image',
    payment:false,
    dataSort:'asc',
    term:'',
    subject:'',
    test:'',
    exam:'',
    total:'',
    grade:'',
    remarks:'',
    msg:''
  }
  componentDidMount() {
    this.props.getStudents();
  }
  handleChange=e=>{
    this.setState({[e.target.name]:e.target.value})
  }
  handleDepartment=e=>{
    this.setState({department:e.target.value})
  }
  handleClass=e=>{
    this.setState({clas:e.target.value})
    this.props.getStudents()
    this.props.getClassBill(e.target.value)
  }
  handleSubmit=e=>{
    e.preventDefault()
    const decode = jwt_decode(localStorage.token)
    const {classBill} = this.props.classBill
    const student = {
      name:this.state.name,
      surname:this.state.surname,
      clas:this.state.clas,
      department:this.state.department,
      gender:this.state.gender,
      religion:this.state.religion,
      date:this.state.date,
      state:this.state.state,
      lga:this.state.lga,
      address:this.state.address,
      pname:this.state.pname,
      psurname:this.state.psurname,
      email:this.state.email,
      number:this.state.number,
      paddress:this.state.paddress,
      school_id:decode.school_id,
      amountPaid:this.state.amountPaid,
      feeStatus:(this.state.amountPaid===classBill.fees)?'paid':'debtor',
      fees:classBill.fees,
      paidAmount: this.state.amountPaid,
      image:this.state.image,
      color:decode.color
    }
    this.props.addStudent(student)
    this.handleToggle()
  }
  
  handleToggle=()=>{
    this.setState({modal:!this.state.modal})
  }
  updateModal=()=>{
    this.setState({up:!this.state.up})
  }
  informationModal=()=>{
    this.setState({info:!this.state.info})
  }
  handleSearch=()=>{
      $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase()
        $("#myTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        })
      })
  }
  openStudentInfo=id=>{
    this.props.studentDetail(id)
    this.props.getStudents()
  }
  openDebtorModal=id=>{
    this.props.studentDetail(id)
    this.props.studentBillDetail(id)
    this.props.getReceipt(id)
    this.props.getStudents()
  }
  openResultModal=id=>{
    this.props.firstTerm(id)
    this.props.studentDetail(id)
    this.props.getStudents()
    this.setState({term:'1stTerm'})
  }
  openSecondTerm=id=>{
    this.props.studentDetail(id)
    this.props.secondTerm(id)
    this.props.getStudents()
    this.setState({term:'2ndTerm'})
  }
  openThirdTerm=id=>{
    this.props.studentDetail(id)
    this.props.thirdTerm(id)
    this.props.getStudents()
    this.setState({term:'3rdTerm'})
  }
  openUpdateModal=(id)=>{
    axios.get(`${OwnerServer}/student/`+id)
        .then(res=>{
          this.setState({
            name:res.data.name,
            surname:res.data.surname,
            clas:res.data.clas,
            department:res.data.department,
            gender:res.data.gender,
            religion:res.data.religion,
            date:res.data.date,
            state:res.data.state,
            lga:res.data.lga,
            address:res.data.address,
            pname:res.data.pname,
            psurname:res.data.psurname,
            email:res.data.email,
            number:res.data.number,
            paddress:res.data.paddress,
            image:res.data.image
          })
        })
    this.props.studentDetail(id)
    this.props.studentBillDetail(id)
    const {student} = this.props.student
    this.props.getStudents();
  }
  handleRemoval=(id)=>{
    const {student} = this.props.student
    this.props.deleteStudentBill(id)
    this.props.deleteStudent(id)
    this.props.getStudents()
  }
  handlePromotion=e=>{
    this.setState({clas:e.target.value})
    this.props.getClassBill(e.target.value)
    const {debtor} = this.props.debtor
    if(debtor.clas===e.target.value){
      this.setState({classChange:false})
    }else{
      this.setState({classChange:true})
    }
    this.props.getStudents()
  }
  handleDebt=e=>{
    e.preventDefault()
    const {debtor} = this.props.debtor
    const {student} = this.props.student
    const studentBill = {
      clas:debtor.clas,
      amountPaid:(Number(this.state.amountPaid)+Number(debtor.amountPaid)),
      fees:debtor.fees,
      status:((Number(this.state.amountPaid)+Number(debtor.amountPaid))===(debtor.fees))?'paid':'debtor',
      name:debtor.name,
      surname:debtor.surname,
      paidAmount:this.state.amountPaid
    }
    this.props.updateStudentBill(student.student_id, studentBill)
    this.props.studentBillDetail(student.student_id)
    this.props.getReceipt(student.student_id)
    this.props.studentDetail(student.student_id)
    this.props.getStudents()
            if((Number(this.state.amountPaid)+Number(debtor.amountPaid))===(debtor.fees)){
              this.setState({status:'paid',name:debtor.name})
            }
    this.setState({payment:true,amountPaid:''})
  }
  handleUpdate=e=>{
    e.preventDefault()
    const {debtor} = this.props.debtor
    const {classBill} = this.props.classBill
    const {student} = this.props.student
    const decode = jwt_decode(localStorage.token)
    const update = {
      name:this.state.name,
      surname:this.state.surname,
      clas:this.state.clas,
      department:this.state.department,
      gender:this.state.gender,
      religion:this.state.religion,
      date:this.state.date,
      state:this.state.state,
      lga:this.state.lga,
      address:this.state.address,
      pname:this.state.pname,
      psurname:this.state.psurname,
      email:this.state.email,
      number:this.state.number,
      paddress:this.state.paddress,
      school_id:decode.school_id,
      image:this.state.image
    }
    this.props.updateStudent(student.student_id,update)
    const fees = (debtor.fees===classBill.fees)?(debtor.fees):(classBill.fees)
    const amountPaid = (debtor.fees===classBill.fees)?(debtor.amountPaid):(this.state.amountPaid)
    const studentBill = {
      clas:this.state.clas,
      amountPaid,
      fees,
      status:(amountPaid===fees)?'paid':'debtor',
      name:this.state.name,
      surname:this.state.surname
    }
    this.props.getStudents()
    if(this.state.amountPaid > 0){
    this.props.updateStudentBill(student.student_id, studentBill)
  }
  }
  imageUpload=()=>{
    $('#newImage').click()
  }
  uploadImage=async e =>{
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'jewbreel')
    this.setState({imageLoading:true})
    const res = await fetch('https://api.cloudinary.com/v1_1/jewbreel1/image/upload',
    {
      method:'POST',
      body:data
    }
    )
    const file = await res.json()
    this.setState({image:file.secure_url})
    this.setState({imageLoading:false})
    console.log(file.secure_url)
  }
  sortData=()=>{
    this.setState({dataSort:this.state.dataSort==='asc' ? 'desc' : 'asc'})
    console.log(this.state.dataSort)
  }
  handleTest=e=> {
    this.setState({test:e.target.value,total:(Number(e.target.value)+Number(this.state.exam))})
  }
  handleExam=e=> {
    this.setState({exam:e.target.value,total:(Number(e.target.value)+Number(this.state.test))})
  }
studentProgress=id=>{
  this.props.studentDetail(id)
  this.props.getAttendance(id)
  this.props.getStudents()
}
  uploadResult=e=> {
    e.preventDefault()
    const {student} = this.props.student
    const newResult = {
      term:this.state.term,
      subject:this.state.subject,
      test:Number(this.state.test),
      exam:Number(this.state.exam),
      total:this.state.total,
      grade:this.state.grade,
      remarks:this.state.remarks,
      student_id:student.student_id
    }
    if(this.state.total===''){
      this.setState({msg:"total result is not a number or can't be empty"})
    } else{
    this.props.addResult(newResult)
    if(this.state.term==='1stTerm'){
      this.props.firstTerm(newResult.student_id)
      this.props.studentDetail(newResult.student_id)
    }
    else if(this.state.term==='2ndTerm'){
      this.props.secondTerm(newResult.student_id)
      this.props.studentDetail(newResult.student_id)
    }
    else{
      this.props.thirdTerm(newResult.student_id)
      this.props.studentDetail(newResult.student_id)
    }
    this.setState({
      subject:'',
      test:'',
      exam:'',
      total:'',
      grade:'Grade',
      remarks:'Remarks'
    })

  }
  }
  deleteResult=(id)=>{
    this.props.deleteResult(id)
  }
  toggleDelete=()=> {
    this.state.toggle===false?this.setState({toggle:true}):this.setState({toggle:false})
  }
    render() {
        const {students} = this.props.students
      const {progress} = this.props.progress
      const {student} = this.props.student
      const {debtor} = this.props.debtor
      const {receipt} = this.props.receipt
      const {result} = this.props.result
    function sum(input){
      if(toString.call(input)!=="[object Array]")
      return false
      var total = 0
      for (var i = 0; i<input.length;i++){
        if(isNaN(input[i])){
          continue
        }
        total += Number(input[i])
      }
      return total
    }
    const totalresult = sum(result.map(result=>result.total))
    const examtotal = sum(result.map(result=>result.exam))
    const testtotal = sum(result.map(result=>result.test))
    const percentage = totalresult/result.length
    console.log(progress)
      return (
        <div className="main-content position-relative">
                <TopNav/>
            <div class="page-content">
                <StudentRegistration
                submit={this.handleSubmit}
                toggle={this.handleToggle}
                clas={this.handleClass}
                change={this.handleChange}
                department={this.handleDepartment}
                state={this.state}
                msg={this.props.students.msg}
                upload={this.uploadImage}
                image={this.imageUpload}
                kR={kR}
                msg={this.props.students.msg}
                />
                <UpdateStudent
                submit={this.handleUpdate}
                clas={this.handlePromotion}
                change={this.handleChange}
                department={this.handleDepartment}
                state={this.state}
                msg={this.props.students.msg}
                upload={this.uploadImage}
                image={this.imageUpload}
                kR={kR}
                msg={this.props.students.msg}
                />
                <StudentInfo
                student={student}
                />
                <DebtorModal
                debtor={debtor}
                receipt={receipt}
                student={student}
                handleChange={this.handleChange}
                handleSubmit={this.handleDebt}
                state={this.state}
                />
                <ResultModal
                student={student}
                result={result}
                openSecond={this.openSecondTerm}
                openThird={this.openThirdTerm}
                testtotal={testtotal}
                examtotal={examtotal}
                totalresult={totalresult}
                percentage={percentage}
                handleExam={this.handleExam}
                handleTest={this.handleTest}
                uploadResult={this.uploadResult}
                msg={this.props.result.msg}
                state={this.state}
                change={this.handleChange}
                />
                <StudentAttendance student={student} progress={progress}/>
            <StudentPage/>
        <StudentCards students={students}/>
        <div class="card">
          <StudentListHeader
          search={this.handleSearch}
          />
          <div class="table-responsive" >
            <table class="table align-items-center" id='myTable'>
              <thead>
                <tr>
                  <th scope="col">
                    
                    Name 
                    
                    </th>
                  <th scope="col">Age</th>
                  <th scope="col">Class</th>
                  <th scope="col">Religion</th>
                  <th scope="col">Fee Status</th>
                  <th scope="col">Gender</th>
                  <th scope='col'></th>
                </tr>
              </thead>
              <StudentList
              students={students}
              update={this.openUpdateModal}
              remove={this.handleRemoval}
              info={this.openStudentInfo}
              debtor={this.openDebtorModal}
              result={this.openResultModal}
              progress={this.studentProgress}
              />
            </table>
          </div>
        </div>
        </div>
    <div class="sidenav-mask mask-body d-xl-none" data-action="sidenav-unpin" data-target="#sidenav-main"></div>

      </div>
        )
    }
}
Students.propTypes = {
  students:PropTypes.object.isRequired,
  getClassBill:PropTypes.func.isRequired,
  classBill:PropTypes.object.isRequired,
  percentage:PropTypes.object.isRequired,
  studentDetail:PropTypes.func.isRequired,
  studentBillDetail:PropTypes.func.isRequired,
  debtor:PropTypes.object.isRequired,
  getStudents: PropTypes.func.isRequired,
  getReceipt: PropTypes.func.isRequired,
  receipt: PropTypes.object.isRequired,
  firstTerm: PropTypes.func.isRequired,
  secondTerm: PropTypes.func.isRequired,
  thirdTerm: PropTypes.func.isRequired,
  getAttendance: PropTypes.func.isRequired,
  progress: PropTypes.object.isRequired
}
const mapStateToProps= state => {
    return{
      students:state.students,
      classBill:state.classBill,
      student:state.student,
      debtor:state.debtor,
      receipt:state.receipt,
      result: state.result,
      progress: state.progress
    }
};
export default connect(mapStateToProps,{addStudent,
  addStudentBill,
  getStudents,
  updateStudent,
   studentDetail,
  deleteStudent,
   studentBillDetail,
   getClassBill,
  updateStudentBill,
   deleteStudentBill,
  getStudents,
getReceipt,
firstTerm,
secondTerm,
thirdTerm,
addResult,
deleteResult,
getAttendance
})(Students)