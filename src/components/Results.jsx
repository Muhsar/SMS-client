import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import jwt_decode from 'jwt-decode'
import {
    studentDetail,
  firstTerm,
  secondTerm,
  thirdTerm
   } from '../actions/actions';
   import TopNav from './TopNav';
import { StudentResult } from './utilities/Cards';
   class Results extends Component {
      componentDidMount=()=>{
          const decode = jwt_decode(localStorage.token)
        this.props.firstTerm(decode.student_id)
        this.props.studentDetail(decode.student_id)
      }
      openSecondTerm=()=>{
          const decode = jwt_decode(localStorage.token)
        this.props.studentDetail(decode.student_id)
        this.props.secondTerm(decode.student_id)
      }
      openThirdTerm=()=>{
          const decode = jwt_decode(localStorage.token)
        this.props.studentDetail(decode.student_id)
        this.props.thirdTerm(decode.student_id)
      }

    render() {
        const {student} = this.props.student
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
      
        return (
            <div className="main-content position-relative">
                <TopNav/>
            <div class="page-content">
                <nav class="nav nav-pills nav-pills-icon nav-justified">
    <a class="nav-item nav-link py-3 active" data-toggle='tab' href="#first">
        
        <span class="d-none d-sm-block mt-2">First Term</span>
    </a>
    <a onClick={this.openSecondTerm} class="nav-item nav-link py-3" data-toggle='tab' href="#second">
        
        <span class="d-none d-sm-block mt-2">Second Term</span>
    </a>
    <a onClick={this.openThirdTerm} class="nav-item nav-link py-3" data-toggle='tab' href="#third">
        
        <span class="d-none d-sm-block mt-2">Third Term</span>
    </a>
    
</nav>
    <div class="tab-content">
  <div class="tab-pane container active" id="first">
    <StudentResult
    student={student}
    result={result}
    testtotal={testtotal}
    examtotal={examtotal}
    totalresult={totalresult}
    percentage={percentage}
    term={'1stTerm'}
    />
  </div>
  <div class="tab-pane container fade" id="second">
  <StudentResult
    student={student}
    result={result}
    testtotal={testtotal}
    examtotal={examtotal}
    totalresult={totalresult}
    percentage={percentage}
    term={'2ndTerm'}
    />
  </div>
  <div class="tab-pane container fade" id="third">
  <StudentResult
    student={student}
    result={result}
    testtotal={testtotal}
    examtotal={examtotal}
    totalresult={totalresult}
    percentage={percentage}
    term={'3rdTerm'}
    />
  </div>
</div>
</div>
</div>
        )
    }
}


Results.propTypes = {
    studentDetail:PropTypes.func.isRequired,
    firstTerm: PropTypes.func.isRequired,
    secondTerm: PropTypes.func.isRequired,
    thirdTerm: PropTypes.func.isRequired,
    result:PropTypes.object.isRequired,
    student:PropTypes.object.isRequired
  }
  const mapStateToProps= state => {
      return{
        student:state.student,
        result: state.result
      }
  };
  export default connect(mapStateToProps,{
     studentDetail,
  firstTerm,
  secondTerm,
  thirdTerm,
})(Results)
