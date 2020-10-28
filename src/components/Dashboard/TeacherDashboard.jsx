import React from 'react'
import { Link } from 'react-router-dom'
export const TeacherProfile=({teacher})=>{
    return(
        <div class="card bg-dark hover-shadow-lg hover-translate-y-n10" style={{color:'#fff'}}>
          <div class="card-header border-0 pb-0">
            <div class="d-flex justify-content-between align-items-center">
              <div class='text-center text-light'>
                <h6 class="mb-0 text-white">{teacher.surname+' '+teacher.name}</h6>
              </div>
              
              </div>
            </div>
          
          <div class="card-body text-center">
          {
      teacher.image==='no image' ? 
      <div className='bg-primary avatar rounded-circle avatar-xl mr-3 hover-translate-y-n3'>
      {teacher.surname.slice(0,1)} {teacher.name.slice(0,1)}
      </div>
      :
  <img class="align-self-center mr-3 avatar avatar-xl hover-translate-y-n3" alt="" src={teacher.image}/>
    }
            
            <div className="row m-lg-5">
                <div className="hover-shadow-lg hover-translate-y-n10 col-md-6 col-sm-6 col-lg-6 col-xl-6">
                    <span className="d-block">
                        <i className="far fa-2x text-white fa-id-badge">
                    </i>
                    </span>
                    <span className="d-none d-sm-block mt-2 text-white">
                        {teacher.teacher_id}
                        </span>
                        </div>
                <div className="hover-shadow-lg hover-translate-y-n10 col-md-6 col-sm-6 col-lg-6 col-xl-6">
                    <span className="d-block">
                        <i className="far fa-2x text-white fa-users-class">
                    </i>
                    </span>
                    <span className="d-none d-sm-block mt-2 text-white">
                        {teacher.clas}
                        </span>
                        </div>
            </div>
            <div className="row m-lg-5">
                <div className="hover-shadow-lg hover-translate-y-n10 col-md-6 col-sm-6 col-lg-6 col-xl-6">
                    <span className="d-block">
                        <i className={"far fa-2x text-white"+(teacher.gender==='Male'?" fa-male":' fa-female')}>
                    </i>
                    </span>
                    <span className="d-none d-sm-block mt-2 text-white">
                        {teacher.gender}
                        </span>
                        </div>
                <div className="hover-shadow-lg hover-translate-y-n10 col-md-6 col-sm-6 col-lg-6 col-xl-6">
                    <span className="d-block">
                        <i className="far fa-2x text-white fa-address-card">
                    </i>
                    </span>
                    <span className="d-none d-sm-block mt-2 text-white">
                        {teacher.address}
                        </span>
                        </div>
            </div>
            <div className="row m-lg-5">
                <div className="hover-shadow-lg hover-translate-y-n10 col-md-6 col-sm-6 col-lg-6 col-xl-6">
                    <span className="d-block">
                        <i className="far fa-2x text-white fa-mailbox">
                    </i>
                    </span>
                    <span className="d-none d-sm-block mt-2 text-white">
                        {teacher.email}
                        </span>
                        </div>
                <div className="hover-shadow-lg hover-translate-y-n10 col-md-6 col-sm-6 col-lg-6 col-xl-6">
                    <span className="d-block">
                        <i className="far fa-2x text-white fa-phone-office">
                    </i>
                    </span>
                    <span className="d-none d-sm-block mt-2 text-white">
                        {teacher.number}
                        </span>
                        </div>
            </div>
            
        </div>
        </div>
    )
}
export const ClassBill=({bill,sum})=>{
    return(
        <div class="card bg-info hover-translate-y-n10 hover-shadow-lg col-sm-12 col-md-12 col-xl-12 col-lg-12" >
           
       
    
    <div class="card-body py-5 table-responsive">
            <div class="row justify-content-between align-items-center">
            <div class="col text-left text-white">
              {bill.clas}
              </div>
              </div>
          
    <table class="table text-white table-bordered">

<tbody>
<tr>
<td colspan='3'>School Fees</td>
<td>#{bill.fees}</td>
</tr>
<tr>
<td colspan='3'>Uniform</td>
<td>#{bill.uniform}</td>
</tr>
<tr>
<th></th>
<th>No. Of Exercise Books Needed</th>
<th>Price Per book</th>
<th>Total</th>
</tr>
<tr>
<th>Exercise Book</th>
<th>#{bill.exerciseBooks}</th>
<th>#{bill.pricePerBook}</th>
<th>#{bill.exerciseBooks*bill.pricePerBook}</th>
</tr>
<tr>
<th colspan='4'>Text Books</th>
</tr>
<tr>
<th colspan='2'>Name</th>
<th colspan='2'>Price</th>
</tr>
{
  bill.textBooks ? bill.textBooks.map(textbook=>{
    return(
    <tr>
      <th colspan='2'>{textbook.name}</th>
      <th colspan='2'>#{textbook.price}</th>
    </tr>
    )
  })
  : null
}
<tr>
  <th colspan='3'>TextBook Total</th>
  <th colspan='1'>#{sum(bill.textBooks ? bill.textBooks.map(price=>(price.price)) : null)}</th>
</tr>

<tr>
<th colspan='3'>Total</th>
<th>
#{bill.fees+bill.uniform+(bill.exerciseBooks*bill.pricePerBook)+(sum(bill.textBooks ? bill.textBooks.map(price=>(price.price)) : null))}
</th>
</tr>
</tbody>
</table>
    </div>
    
</div>
    )
}
export const PreviewStudents=({students})=>{
    return(
        <div class="card bg-primary hover-translate-y-n10 hover-shadow-lg" >
           
       
    
        <div class="card-body py-5">
        <div class="avatar-group hover-avatar-ungroup hover-shadow-lg hover-translate-y-n10">
            {
                students.length ? students.map(student=>{
                    return(
                        <>
                        {
                            student.image!=='no image' ?
                    <img alt="" src={student.image} class="avatar  rounded-circle hover-shadow-lg hover-translate-y-n10 "/>
                    :
                    <span class="avatar hover-shadow-lg hover-translate-y-n10  bg-soft-primary text-primary rounded-circle">{student.surname.slice(0,1)+student.name.slice(0,1)}</span>
                        }
                        </>
                    )
                })
                : null
            }
</div>
<br/>

            <div className="row">
            {
            students.length ? (students.slice(0,6)).map(student=>{
                return(
                    <div className="card hover-shadow-lg hover-translate-y-n10 bg-primary col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <div className="card-body">
                    <span className="d-block">
                        <i className="far fa-2x text-white fa-user-graduate">
                    </i>
                    </span>
                    <span className="d-none d-sm-block mt-2 text-white">
                        {student.surname+' '+student.name}
                        </span>
                        </div>
            </div>
                    )
            }) : null
        }

            </div>
        <Link to='/students' className='text-white'>View all Students</Link>
        </div>
        </div>
    )
}
export const ClassDebtors=({debtors,students})=>{
    return(
        <div class="card col-xl-6 col-lg-6 col-sm-6 bg-danger hover-translate-y-n10 hover-shadow-lg" >
           
       
    
        <div class="card-body py-5">
        <div class="avatar-group hover-avatar-ungroup hover-shadow-lg hover-translate-y-n10">
            {
                students.length ? students.map(student=>{
                    return(
                        <>
                        {
                            student.feeStatus==='debtor' ?
                            <>
                        {
                            student.image!=='no image' ?
                            <img alt="" src={student.image} class="avatar  rounded-circle hover-shadow-lg hover-translate-y-n10"/>
                            :
                    <span class="avatar hover-shadow-lg hover-translate-y-n10  bg-soft-danger text-danger rounded-circle">{student.surname.slice(0,1)+student.name.slice(0,1)}</span>
                        }
                        </>
                        : null
                        }
                        </>
                    )
                })
                : null
            }
</div>
<br/>

            <div className="row">
            {
            debtors.length ? debtors.map(debtor=>{
                return(
                    <>
                    {
                        debtor.feeStatus==='debtor' ?
                        <div className="card hover-shadow-lg hover-translate-y-n10 bg-danger col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <div className="card-body">
                    <span className="d-block">
                        <i className="far fa-2x text-white fa-user-graduate">
                    </i>
                    </span>
                    <span className="d-none d-sm-block mt-2 text-white">
                        {debtor.surname+' '+debtor.name}
                        </span>
                        <span className="d-none d-sm-block mt-2 text-white">
                        {debtor.clas}
                        </span>
                        </div>
            </div>
            : null
                    }
            </>
                    )
            }) : null
        }

            </div>
        <p className='text-white'>Debtors</p>
        </div>
        </div>
    )
}
export const ClassCreditors=({students,creditors})=>{
    return(
        <div class="card col-xl-6 col-lg-6 col-sm-6 bg-success hover-translate-y-n10 hover-shadow-lg" >
           
       
    
        <div class="card-body py-5">
        <div class="avatar-group hover-avatar-ungroup hover-shadow-lg hover-translate-y-n10">
            {
                students.length ? students.map(student=>{
                    return(
                        <>
                        {
                            student.feeStatus==='paid' ?
                            <>
                        {
                            student.image!=='no image' ?
                            <img alt="" src={student.image} class="avatar  rounded-circle hover-shadow-lg hover-translate-y-n10"/>
                            :
                    <span class="avatar hover-shadow-lg hover-translate-y-n10  bg-soft-success text-success rounded-circle">{student.surname.slice(0,1)+student.name.slice(0,1)}</span>
                        }
                        </>
                        : null
                        }
                        </>
                    )
                })
                : null
            }
</div>
<br/>

            <div className="row">
            {
            creditors.length ? creditors.map(creditor=>{
                return(
                    <>
                    {
                        creditor.feeStatus==='paid' ?
                        <div className="card hover-shadow-lg hover-translate-y-n10 bg-success col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <div className="card-body">
                    <span className="d-block">
                        <i className="far fa-2x text-white fa-user-graduate">
                    </i>
                    </span>
                    <span className="d-none d-sm-block mt-2 text-white">
                        {creditor.surname+' '+creditor.name}
                        </span>
                        <span className="d-none d-sm-block mt-2 text-white">
                        {creditor.clas}
                        </span>
                        </div>
            </div>
            : null
                    }
            </>
                    )
            }) : null
        }

            </div>
        <p className='text-white'>Creditors</p>
        </div>
        </div>
    )
}