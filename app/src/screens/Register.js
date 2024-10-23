import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import React, { useState, useContext } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import colors from '../utils/Colors'
import { TextInput } from '@react-native-material/core'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { cpf, cnpj } from 'cpf-cnpj-validator'
import { AuthContext } from '../contexts/AuthContext'
import Loader from '../components/loaders/Loader'
import { Picker } from '@react-native-picker/picker';

export default function Register({ navigation, route }) {

    const { signUp, loading } = useContext(AuthContext)

    const insets = useSafeAreaInsets()

    const type = route.params.type //P - prestador; C - cliente

    //Estados dos inputs
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmSenha, setConfirmSenha] = useState('')
    const [nome, setNome] = useState('')
    const [documento, setDocumento] = useState('')
    const [celular, setCelular] = useState('')
    const [genero, setGenero] = useState('M')

    //Estados da verificação de senha
    const [verSenha, setVerSenha] = useState(false)
    const [verConfirmSenha, setVerConfirmSenha] = useState(false)

    //Estados para validação dos campos
    const [validaNome, setValidaNome] = useState(false)
    const [validaDocumento, setValidaDocumento] = useState(false)
    const [validaCelular, setValidaCelular] = useState(false)
    const [validaEmail, setValidaEmail] = useState(false)
    const [validaSenha, setValidaSenha] = useState(false)
    const [msgSenha, setMsgSenha] = useState('Informe a senha')
    const [validaConfirmSenha, setValidaConfirmSenha] = useState(false)
    const [msgConfirmSenha, setMsgConfirmSenha] = useState('Informe a senha')

    const handleDocumento = (text) => {
        let value = text.replace(/\D/g, '');

        // Aplica máscara de CPF (11 dígitos)
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } 
        // Aplica máscara de CNPJ (14 dígitos)
        else if (value.length <= 14) {
            value = value.replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
        }

        setDocumento(value);
    }

    const handleFone = (text) => {
        text = text.replace(/\D/g, '')

        if(text.length > 10){
            text = text.replace(/^(\d{2})(\d{5})(\d{4})/, "($1)$2-$3")
        }
        else{
            text = text.replace(/(\d{2})(\d)/, '($1)$2')
                .replace(/(\d{4})(\d{1,4})/, '$1-$2')
        }

        setCelular(text)
    }

    const handleContinue = () => {
        let erro = 0

        //validando nome
        if(nome === ''){
            setValidaNome(true)
            erro++
        }
        else{
            setValidaNome(false)
        }

        //validando documento
        if(documento === ''){
            setValidaDocumento(true)
            erro++
        }
        else if(documento.length !== 14 && documento.length !== 18){
            setValidaDocumento(true)
            erro++
        }
        else{
            const doc = documento.replace(/\D/g, '')
            if(doc.length === 11){
                if(!cpf.isValid(doc)){
                    setValidaDocumento(true)
                    erro++
                }
                else{
                    setValidaDocumento(false)
                }
            }
            else{
                if(!cnpj.isValid(doc)){
                    setValidaDocumento(true)
                    erro++
                }
                else{
                    setValidaDocumento(false)
                }
            }
        }

        //Validando celular
        if(celular === ''){
            setValidaCelular(true)
            erro++
        }
        else if(celular.length !== 14){
            setValidaCelular(true)
            erro++
        }
        else{
            setValidaCelular(false)
        }

        //Validando email
        if(email === ''){
            setValidaEmail(true)
            erro++
        }
        else{
            setValidaEmail(false)
        }

        //Validando senha
        if(senha === ''){
            setMsgSenha('Informe uma senha')
            setValidaSenha(true)
            erro++
        }
        else if(senha.length < 8){
            setMsgSenha('A senha deve conter ao menos 8 dígitos')
            setValidaSenha(true)
            erro++
        }
        else{
            setValidaSenha(false)
        }

        //Validando confirmação da senha
        if(confirmSenha === ''){
            setMsgConfirmSenha('Informe a senha')
            setValidaConfirmSenha(true)
            erro++
        }
        else if(confirmSenha !== senha){
            setMsgConfirmSenha('Senhas diferem uma da outra')
            setValidaConfirmSenha(true)
            erro++
        }
        else{
            setValidaConfirmSenha(false)
        }

        if(erro > 0){
            return false
        }

        parametros = {
            nome,
            documento: documento.replace(/\D/g, ''),
            celular,
            genero,
            email, 
            senha,
            type
        }

        signUp(parametros)
    }

    return (
        <View
            style={{ paddingTop: insets.top, backgroundColor: colors.WHITE, flex: 1 }}
        >
            <ScrollView
                style={{ width: '100%', backgroundColor: colors.WHITE }}
                contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <Image 
                    source={require('../../assets/logo.png')}
                    resizeMode='contain'
                    style={styles.logo}
                />

                <Text style={styles.textEntrar}>Crie sua conta</Text>

                <View style={styles.inputsContainer}>

                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input}
                            variant='outlined'
                            label={'Nome completo'}
                            value={nome}
                            onChangeText={setNome}
                            color={colors.PRIMARY}
                            leading={() => <Feather name="user" size={20} color={colors.PRIMARY} />}
                        />
                        {validaNome && <Text style={styles.textErro}>Informe o nome</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <View
                            style={{ width: '90%', borderRadius: 5, borderWidth: 1, borderColor: colors.GRAYINPUT }}
                        >
                            <Picker
                                selectedValue={genero}
                                onValueChange={(itemValue, itemIndex) =>
                                    setGenero(itemValue)
                                }
                                style={{ width: '100%' }}
                            >
                                <Picker.Item label="Masculino" value="M" />
                                <Picker.Item label="Feminino" value="F" />
                                <Picker.Item label="Outro" value="O" />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input}
                            variant='outlined'
                            label={'CPF ou CNPJ'}
                            value={documento}
                            onChangeText={handleDocumento}
                            color={colors.PRIMARY}
                            leading={() => <AntDesign name="idcard" size={20} color={colors.PRIMARY} />}
                            maxLength={18}
                            keyboardType='number-pad'
                        />
                        {validaDocumento && <Text style={styles.textErro}>Informe um documento válido</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input}
                            variant='outlined'
                            label={'Nº Celular'}
                            value={celular}
                            onChangeText={handleFone}
                            color={colors.PRIMARY}
                            leading={() => <Feather name="phone" size={20} color={colors.PRIMARY} />}
                            maxLength={14}
                            keyboardType='number-pad'
                        />
                        {validaCelular && <Text style={styles.textErro}>Informe um número válido</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input}
                            variant='outlined'
                            label={'Email'}
                            value={email}
                            onChangeText={setEmail}
                            color={colors.PRIMARY}
                            leading={() => <Feather name="mail" size={20} color={colors.PRIMARY} />}
                            inputMode='email'
                            autoCapitalize='none'
                        />
                        {validaEmail && <Text style={styles.textErro}>Informe um email válido</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input}
                            variant='outlined'
                            label={'Senha'}
                            value={senha}
                            onChangeText={setSenha}
                            color={colors.PRIMARY}
                            leading={() => <Feather name="unlock" size={20} color={colors.PRIMARY} />}
                            trailing={() => {
                                return verSenha ? 
                                <Feather name="eye" size={24} color={colors.PRIMARY} onPress={() => setVerSenha(!verSenha)} /> :
                                <Feather name="eye-off" size={24} color={colors.PRIMARY} onPress={() => setVerSenha(!verSenha)} /> 
                            }}
                            secureTextEntry={!verSenha}
                            autoCapitalize='none'
                        />
                        {validaSenha && <Text style={styles.textErro}>{msgSenha}</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input}
                            variant='outlined'
                            label={'Confirme a senha'}
                            value={confirmSenha}
                            onChangeText={setConfirmSenha}
                            color={colors.PRIMARY}
                            leading={() => <Feather name="unlock" size={20} color={colors.PRIMARY} />}
                            trailing={() => {
                                return verConfirmSenha ? 
                                <Feather name="eye" size={24} color={colors.PRIMARY} onPress={() => setVerConfirmSenha(!verConfirmSenha)} /> :
                                <Feather name="eye-off" size={24} color={colors.PRIMARY} onPress={() => setVerConfirmSenha(!verConfirmSenha)} /> 
                            }}
                            secureTextEntry={!verConfirmSenha}
                            autoCapitalize='none'
                        />
                        {validaConfirmSenha && <Text style={styles.textErro}>{msgConfirmSenha}</Text>}
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.btnEntrar}
                    activeOpacity={0.8}
                    onPress={handleContinue}
                >
                    <Text style={{ color: colors.SECONDARY, fontWeight: 'bold', fontSize: 16 }}>Continuar</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', marginTop: 20, gap: 5, marginBottom: 150 }}>
                    <Text>Já possui conta?</Text>
                    <Pressable
                        onPress={() => navigation.popToTop()}
                    >
                        <Text style={{ fontWeight: 'bold' }}>Entrar</Text>
                    </Pressable>
                </View>
            </ScrollView>

            <Loader loading={loading} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE
    },
    logo: {
        width: '20%',
        height: '10%',
        marginTop: 30
    },
    textEntrar: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 20
    },
    inputsContainer: {
        width: '100%',
        marginTop: 30,
        alignItems: 'center',
        gap: 15
    },
    input: {
        width: '90%',
        backgroundColor: colors.WHITE
    },
    btnEntrar: {
        backgroundColor: colors.PRIMARY,
        padding: 15,
        width: '90%',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    },
    textErro: {
        color: 'red',
        alignSelf: 'flex-start',
        marginLeft: '5%'
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center'
    }
})