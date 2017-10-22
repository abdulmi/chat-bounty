import React from 'react';
import {recieveMessage, sendMessage} from './api';
import styles from './Chat.css'
import {address, myBounty, web3} from '../contracts/contract.js'

/**
 * A counter button: tap the button to increase the count.
 */
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      inputValue: "",
      paymentInputValue: 0,
      deposit: 3,
      withdraw: 0,
      question: "temp question",
      asker: "0xdffewsdfsdffqwef12214",
      answerer: "0xajsdfljdsflj3ljlradfsdfsdfj"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMilestoneSubmit = this.handleMilestoneSubmit.bind(this);
    this.handlePaymentInput = this.handlePaymentInput.bind(this);
    this.handleWithdraw = this.handleWithdraw.bind(this);

    console.log(web3)
    console.log(web3.fromWei(web3.eth.getBalance(web3.eth.accounts[1]).toNumber()));


    // console.log(web3.fromWei(web3.eth.getBalance(address).toNumber()));
    // myBounty.withdraw.sendTransaction({from: web3.eth.accounts[1]},(err,res)=>console.log(err,res));

    //DEPLOY CONTRACT
    // var browser_con_sol_bountiesContract = web3.eth.contract(abi);
    // var browser_con_sol_bounties = browser_con_sol_bountiesContract.new(
    //    {
    //      from: web3.eth.accounts[0],
    //      data: bytecode,
    //      gas: '4700000'
    //    }, function (e, contract){
    //     console.log(e, contract);
    //     if (typeof contract.address !== 'undefined') {
    //          console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    //     }
    // })

    // var bounty = web3.eth.contract(abi);
    // var myBounty = bounty.at(address);
    // console.log(myBounty)

    // A bunch of contract functions for testing purposes
    // myBounty.addQuestion.sendTransaction({from: web3.eth.accounts[0], value: 3000000000000000000},(err,res)=>{console.log(err,res)})
    // myBounty.getQuestionFromUser.call({from:web3.eth.accounts[0]},(err,res)=>console.log(err,res.toNumber()))
    // myBounty.getExpertFromQuestion.call(1,(err,res)=>console.log(err,res))
    // myBounty.answer.sendTransaction(1,{from:web3.eth.accounts[1]},(err,res)=>console.log(err,res))
    // myBounty.withdrawBalance.call({from: web3.eth.accounts[1]}, (err,res)=>console.log(err,res.toNumber()))
    // myBounty.withdraw.sendTransaction({from: web3.eth.accounts[1]}, (err,res)=>console.log(err,res))

    recieveMessage(function(err,new_message){
        console.log('looking for new incoming messages')
        this.setState({messages: this.state.messages.concat(
            <li className={styles.message}>
                <span className={styles.expert}>Expert</span>
                <span>{new_message.message}</span>
            </li>
        )})
        console.log(this.state.messages)
      }.bind(this)
    )
  }

  handleChange(event){
    this.setState({inputValue: event.target.value});
  }

  handlePaymentInput(event){
    this.setState({paymentInputValue: event.target.value});
  }

  handleMilestoneSubmit(event){
    event.preventDefault();
    // console.log(web3.eth.accounts[0])
    if(web3.fromWei(this.state.paymentInputValue) <= this.state.deposit && this.state.paymentInputValue !== 0) {
        console.log('hello')
        var amount = this.state.paymentInputValue;
        this.setState({deposit: this.state.deposit-web3.fromWei(amount),paymentInputValue:0, withdraw: Number(this.state.withdraw)+Number(web3.fromWei(amount))})
        myBounty.releaseMilestone.sendTransaction(amount,{from: web3.eth.accounts[0]},(err,res)=>console.log(err,res))
    }
  }

  handleWithdraw(event){
    console.log("hey")
    event.preventDefault();
    myBounty.withdraw.sendTransaction({from: web3.eth.accounts[1]}, (err,res)=>console.log(err,res))
    this.setState({withdraw: 0})
  }

  handleSubmit(event){
    event.preventDefault();
    if(this.state.inputValue !== ""){
      sendMessage(this.state.inputValue)
      this.setState(
        {
          inputValue:"",
          messages: this.state.messages.concat(
              <li className={styles.message}>
                  <span className={styles.you}>You  </span>
                  <span>{this.state.inputValue}</span>
              </li>
          )
        })
    }
  }


  render() {
    const messages_html = this.state.messages.map((message)=>{
        <li>{message}</li>
    })
    return (
      <div >
        <div className={styles.details}>
          <div className={styles.question}> <span> Question: {this.state.question} [{this.state.deposit} Eth] </span></div>
          <form onSubmit={this.handleWithdraw} style={{textAlign:"Center", marginBottom: "1%"}}>
            <input type="submit" value="Withdraw" />
            <span > {this.state.withdraw} Eth </span>
          </form>
          <form style={{marginLeft:"40%"}} onSubmit={this.handleMilestoneSubmit}>
            <input placeholder="amount in Wei" onChange={this.handlePaymentInput} value={this.state.paymentInputValue} type="number" min="1" step="any"/>
            <input type="submit" value="Pay" />
          </form>
          <div style={{float:"left"}}>
            <span className={styles.you}>You </span>
            <span> {this.state.asker} </span>
          </div>
          <div style={{float:"right"}}>
            <span className={styles.expert}>Expert </span>
            <span> {this.state.answerer} </span>
          </div>
        </div>
        <div className={styles.chat_box}>
          <ul className={styles.messages}>
            {this.state.messages}
          </ul>
          <form className={styles.submit} onSubmit={this.handleSubmit}>
            <input placeholder="Type here..." onChange={this.handleChange} value={this.state.inputValue} type="text" className={styles.chat_input} />
          </form>
        </div>
      </div>
    );
  }
}
export default Chat;
