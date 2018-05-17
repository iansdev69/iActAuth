/**
 * @flow
 */
import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { 
    Card, 
    CardSection, 
    Button,
    Input,
    Spinner
} from './common';

type Props = {};

class LoginForm extends Component<Props> {
    state = {
        email: '',
        password:'',
        error: '',
        loading: false
    }

    onLogin() {
        const { email, password } = this.state;
        this.setState({error: '', loading: true});
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch ((() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));
            }))
    }
    
    onLoginFail() {
        this.setState({
            error: 'Authentication Failed!',
            loading: false
        });
    }
    onLoginSuccess() {
        this.setState({
            email: '',
            password:'',
            error: '',
            loading: false
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return (
            <Button onPress={this.onLogin.bind(this)}>Log in</Button>
        );
    }

    render() {
        return (
            <Card>
               <CardSection>
                <Input
                    label={'Email'}
                    placeholder={'user@gmail.com'}
                    value={ this.state.email }
                    onChangeText={email=>this.setState({ email} )}
                />
               </CardSection>
               <CardSection>
                    <Input
                        secureTextEntry
                        label={'Password'}
                        placeholder={'password'}
                        value={ this.state.password }
                        onChangeText={password=>this.setState({password} )}
                    />
               </CardSection>
                <Text style={styles.errorText} > {this.state.error} </Text>
               <CardSection>
                    { this.renderButton() }
               </CardSection>
            </Card>
        );
    }
};

const styles = {
    errorText: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};
export default LoginForm;
