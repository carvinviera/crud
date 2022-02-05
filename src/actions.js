//tutorial zuluoaga
import { firebaseApp } from './firebase_local';
//import * as firebase from 'firebase';
import firebase from 'firebase';//primer comentario quita esto y anda
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp)

export const getCollection = async(collectionName) => {
    const result = { statusResponse : false, data : null, error : null }
    try {
        const data = await db.collection(collectionName).get()
        const arrayData = data.docs.map(doc => ({id : doc.id, ...doc.data()})) 
        result.statusResponse = true
        result.data = arrayData
    } catch (error){
        result.error = error
    }

    return result
}

export const addDocument = async(collectionName, dataJson) => {
    const result = { statusResponse : false, dataJson : null, error : null }
    try {
        const response = await db.collection(collectionName).add(dataJson)
        result.data = { id : response.id }
        result.statusResponse = true
    } catch (error){
        result.error = error
    }

    return result
}

export const getDocument = async(collectionName, id) => {
    const result = { statusResponse : false, data : null, error : null }
    try {
        const response = await db.collection(collectionName).doc(id).get()
        result.data = { id : response.id, ...response.data() }
        result.statusResponse = true
    } catch (error){
        result.error = error
    }
    return result
}

export const updateDocument = async(collectionName, id, data) => {
    const result = { statusResponse : false, error : null }
    try {
        await db.collection(collectionName).doc(id).update(data)
        result.statusResponse = true
    } catch (error){
        result.error = error
    }
    return result
}

export const deleteDocument = async(collectionName, id) => {
    const result = { statusResponse : false, error : null }
    try {
        await db.collection(collectionName).doc(id).delete()
        result.statusResponse = true
    } catch (error){
        result.error = error
    }
    return result
}

