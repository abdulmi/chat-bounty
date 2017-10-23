import React from 'react';
import styles from './question.css'
import {myBounty, web3} from '../contracts/contract.js'
import Chat from './Chat.js'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

class question extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        questions: [],
        questionInputValue: "",
        addressInputValue: "",
        deposit: 0
    }
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handlePaymentChange = this.handlePaymentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);

  }

  handleQuestionChange(event){
    this.setState({questionInputValue: event.target.value})
  }

  handleAddressChange(event){
    this.setState({addressInputValue: event.target.value})
  }

  handlePaymentChange(event){
    this.setState({deposit: event.target.value})
  }

  handleAnswer(event){
    event.preventDefault()
    //hardcoded for now
    // myBounty.answer.sendTransaction(1,{from:web3.eth.accounts[1]});
  }

  handleSubmit(event){
    event.preventDefault()
    // myBounty.addQuestion.sendTransaction({from: this.state.addressInputValue, value: this.state.deposit});
    this.setState({
                    questions: this.state.questions.concat(<div>
                                                            <li className={styles.questionCard}> {this.state.questionInputValue}</li>
                                                            <button  onClick={this.handleAnswer} className={styles.answerQuestion} >
                                                              <Link className={styles.answerLink} to={"/chat"}> Answer </Link>
                                                            </button>
                                                          </div>
                                                          ),
                  })
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact={true} path="/" render={()=>(
            <div>
              <div className={styles.newQuestion}> Submit a new question </div>
              <form onSubmit={this.handleSubmit}>
                <input className={styles.fields} type="text" onChange={this.handleQuestionChange} placeholder="question"/>
                <input className={styles.fields} type="text" onChange={this.handleAddressChange} placeholder="your address"/>
                <input className={styles.fields} type="number" step="any" onChange={this.handlePaymentChange} placeholder="amount in Eth" />
                <input className={styles.submitQuestion} type="submit" value="Ask Question" />
              </form>
              <ul className={styles.question}>
                {this.state.questions}
              </ul>
            </div>
          )}
          />
          <Route path="/chat" render={()=>(
             <Chat asker={this.state.addressInputValue} question={this.state.questionInputValue} deposit={this.state.deposit}/>
           )}
          />
        </div>
      </Router>
    )
  }
}

export default question;
