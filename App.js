import React, { Component } from 'react';


class Header extends React.Component {
   constructor(props) {
      super(props)
   }
   render() {
      return (
         <div>
            <h1>{this.props.text}</h1>
         </div>
      )
   }
}

class Output extends React.Component {
   constructor(props) {
      super(props)
   }

   render() {
      return <div><h4>Message: {this.props.originalMessage}</h4><h4>Seed: {this.props.seed}</h4>
         <hr></hr>
         <h2>OUTPUT: {this.props.output}</h2></div>
   }
}

class Input extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         inputVal: ""
      }
      this.changeHandler = this.changeHandler.bind(this)
   }

   changeHandler(e) {
      this.props.parentFunction(e.target.value)
   }

   render() {
      return (
         <div>
            <label>{this.props.labelName}</label>
            <input type={this.props.inputType} id={this.props.id} onChange={this.changeHandler} />
         </div>
      )
   }
}

class EncryptionForm extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         originalMessage: "",
         messageSubmit: "",
         seed: 11,
         outputMessage: "",
      }
      this.clickHandler = this.clickHandler.bind(this)
   }

   getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
   }

   clickHandler() {
      var seed = this.getRandomInt(11, 99);
      var encryptedMessage = this.getEncryptedMessage(seed);
      this.setState((state, props) => ({ messageSubmit: this.state.originalMessage, seed: seed, outputMessage: encryptedMessage }));
   }


   getEncryptedMessage(seed) {
      var vowSteps = Math.floor(seed / 10);
      var conSteps = Math.floor(seed % 10);
      var output = [];
      var msgList = this.state.originalMessage.split("");
      var alphabet = "abcdefghijklmnopqrstuvwxyzabcdefghigklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIGKLMNOPQRSTUVWXYZ";
      for (var i = 0; i < msgList.length; i++) {
         var letter = msgList[i];
         var m = String(letter.match(/[aeiouAEIOU]/gi));
         if (m != "null") {
            output.push(alphabet[alphabet.indexOf(m[0]) + vowSteps]);
         } else {
            var m = String(letter.match(/[bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ]/gi));
            if (m != "null") {
               output.push(alphabet[alphabet.indexOf(m[0]) + conSteps]);
            } else {
               output.push(letter);
            }
         }
      }
      var final = output.join("");
      return final;
   }

   render() {
      return (
         <div>
            <Input id="originalMessage" autoComplete="off" labelName="Original Message: " inputType="text" parentFunction={(oMessage) => this.setState((state, props) => ({ originalMessage: oMessage }))} />
            <button onClick={this.clickHandler}>{this.props.buttonName}</button>
            <Output originalMessage={this.state.messageSubmit} seed={this.state.seed} output={this.state.outputMessage} />
         </div>
      )
   }
}

class Content extends React.Component {
   constructor(props) {
      super(props)
   }

   render() {
      return (
         <div>
            <EncryptionForm buttonName="Convert" />
         </div>
      )
   }
}

class App extends React.Component {
   render() {
      return (
         <div>
            <Header text="Encrypt your message" />
            <Content />
         </div>
      )
   }
}
export default App;
