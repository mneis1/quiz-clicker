import React, {Component} from 'react';

import {connect} from 'react-redux';
import Button from "reactstrap/src/Button";

class CreateQuizButton extends Component{



    render(){
        return (
            <div>
                <Button color="dark" size="lg" >
                    Create Quiz
                </Button>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    token: state.users.token,
    teacher: state.users.teacher
});

export default connect(mapStateToProps)(CreateQuizButton);