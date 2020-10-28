import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import TopNav from './TopNav'
import { schoolData, getClassBill, getStudents,getStudentBill } from '../actions/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { ClassBill, ClassCreditors, ClassDebtors, PreviewStudents, TeacherProfile } from './Dashboard/TeacherDashboard';
import { Link } from 'react-router-dom';
import { ProfileTabs } from './utilities/UpdateModal';
import { ParentServer, TeacherServer } from '../servers';
import axios from 'axios'
import $ from 'jquery'
class Dashboard extends Component {
    state={
        oldPassword:'',
        newPassword:'',
        confirmPassword:'',
        error:'',
        msg:'',
        color:''
}
// componentWillMount(){
//     const decode = jwt_decode(localStorage.token)
//     if(decode.type!=='owner'){
//         this.props.schoolData(decode.school_id)
//     }
// }
    componentDidMount(){
        const decode = jwt_decode(localStorage.token)
        if(decode.type!=='owner'){
            this.props.schoolData(decode.school_id)
            this.props.getClassBill(decode.clas)
            if(decode.type==='teacher'){
                this.props.getStudents()
                this.props.getStudentBill()
            }
            if(decode.type==='student'){
                
            }
     
        }
        axios.get(`${decode.type==='teacher' ? TeacherServer : ParentServer}/`)
        .then(res=>{
            this.setState(decode.type==='teacher' ? res.data.teacher : res.data.student)
        })
        console.log(decode.color)
    }
    updateColor=e=>{
        const decode = jwt_decode(localStorage.token)
        const {school} = this.props.school
        const color={color:school.color}
        if(school){
        axios.post(`${decode.type==='teacher' ? TeacherServer : ParentServer}/color`,color)
          .then(res=>{
            localStorage.setItem('token',res.data.token)
            console.log(res.data.token)
          })
      }
    }
    imageUpload=()=>{
        $('#updateImage').click()
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
      handleChange=e=>{
        this.setState({[e.target.name]:e.target.value})
      }
      handleUpdate=e=>{
        e.preventDefault()
        const decode = jwt_decode(localStorage.token)
        const {
            oldPassword,
            newPassword,
            confirmPassword
        } = this.state
        const passwords = {
            oldPassword,
            newPassword
        }
        
        if(newPassword!==confirmPassword){
            this.setState({error:"Passwords do not Match"})
        }
        else{
            axios.post(`${decode.type==='teacher' ? TeacherServer : ParentServer}/password`,passwords)
            .then(res=>{
                res.data.error ? 
                this.setState({error:res.data.error})
                :
                this.setState({msg:res.data.msg,error:'',oldPassword:'',newPassword:'',confirmPassword:''})
            })
        }
    }
    handleUpload=e=>{
        e.preventDefault()
        const decode = jwt_decode(localStorage.token)
        const {image} = this.state
        axios.post(`${decode.type==='teacher' ? TeacherServer : ParentServer}/image`,image)
        .then(res=>{
            this.setState({msg:res.data.msg})
            localStorage.setItem('token',res.data.token)
        })
    }
    render() {
        const decode = jwt_decode(localStorage.token)
        const {school} = this.props.school
        if(school){
            this.updateColor()
        }
        const {studentBill} = this.props.studentBill
        const sum=(input)=>{
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
          const {classBill} = this.props.classBill
          const {students} = this.props.students
          const state = this.state
        return (
        <div className="main-content position-relative">
                <TopNav/>
            <div className='page-content'>
            <ProfileTabs
            upload={this.handleUpload}
            update={this.handleUpdate}
            state={state}
            uploadImage={this.uploadImage}
            imageUpload={this.imageUpload}
            change={this.handleChange}
            />
                <div class="card card-profile hover-shadow-lg hover-translate-y-n10">
    <div class="card-profile-cover">
        <img alt="" src={school.logo} class="card-img-top"/>

    </div>
    <a href="#" class="mx-auto">
        {
            decode.image==='no image' ? 
            <div className="card-profile-image avatar  bg-primary rounded-circle shadow hover-shadow-lg">
                <h1 className='text-white'>
                    {decode.surname.slice(0,1)}{decode.name.slice(0,1)}
                    </h1>
            </div>
            :
        <img alt="" src={decode.image} class="card-profile-image avatar rounded-circle shadow hover-shadow-lg"/>
        }
    </a>
    <div class="card-body p-3 pt-0 text-center">
        <h5 class="mb-0">{decode.surname+' '+decode.name}</h5>
        <span class="d-block text-muted mb-3">{decode.type==='teacher' ? decode.teacher_id : decode.student_id}</span>
        <span class="d-block text-muted mb-3">
    <button className="mx-auto btn btn-action-label text-dark" type='button' data-target='#editProfile' data-toggle='modal'>Edit Profile</button>
        </span>
    </div>
</div>
<div className="row">
    <div className='col-xl-6 col-lg-6 col-sm-6'>
    <TeacherProfile teacher={decode}/>
    </div>
    <div className='col-xl-6 col-lg-6 col-sm-6'>
    <PreviewStudents students={students}/>
    </div>
</div>
<div className="row">
        <ClassBill sum={sum} bill={classBill}/>
        </div>
        <div className="row">
            <ClassDebtors debtors={studentBill} students={students}/>
            <ClassCreditors creditors={studentBill} students={students}/>
        </div>
        </div>
    <div class="sidenav-mask mask-body d-xl-none" data-action="sidenav-unpin" data-target="#sidenav-main"></div>

            </div>
        )
    }
}
Dashboard.propTypes={
    school:PropTypes.object.isRequired,
    schoolData:PropTypes.func.isRequired,
    classBill:PropTypes.object.isRequired,
    getClassBill:PropTypes.func.isRequired,
    students:PropTypes.object.isRequired,
    getStudents:PropTypes.func.isRequired,
    getStudentBill:PropTypes.func.isRequired,
    studentBill:PropTypes.object.isRequired
}
const mapStateToProps=state=>{
    return{
        school:state.school,
        classBill: state.classBill,
        students:state.students,
        studentBill:state.studentBill
    }
}
export default connect(mapStateToProps,{schoolData,getClassBill,getStudents,getStudentBill})(Dashboard)