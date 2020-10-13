import React,{Component} from 'react';
import {View, StyleSheet, Image, Button, Text} from 'react-native';

// imagePicker 라이브러리 적용
import imagePicker from 'react-native-image-picker';

export default class Main extends Component{

    constructor(){
        super();
        this.state={
            img:{uri:''}
        }
    }

    render(){
        return(
            <View style={styles.root}>
                <Button title="show picker" onPress={()=>{this.showPicker()}}></Button>
                <Text style={styles.text}>경로 : {this.state.img.uri}</Text>
                <Image style={styles.img} source={this.state.img}></Image>
            </View>
        );  
    }

    showPicker=()=>{

        // 안드로이드의 퍼미션작업 필요
        // 1. 카메라 사용 퍼미션 2. 외부메모리 사용 퍼미션
        // Android Manifest.xml문서에서 작업

        // 다이얼로그 옵션설정
        const options={
            title:'사진선택',
            cancelButtonTitle:'취소',
            takePhotoButtonTitle:'카메라로 사진찍기',
            chooseFromLibraryButtonTitle:'갤러리에서 사진선택',

            // 카메라 선택시 추가옵션
            storageOption:{
                skipBackup:true,// ios에서 icloud에 백업할 것인가? - android는 무시함(속성이 있든 없든)
                path:'images',// 저장될 폴더명 [ Pictures/images ]가 생성되면서 저장됨
            }
        }

        // picker Dialog보이기
        imagePicker.showImagePicker(options, (response)=>{
            
            if(response.didCancel){
                console.log('usr cancelled image picker');
                alert('User cancelled image picker');
            }else if(response.error){
                alert('imagePicker error : '+ response.error+"");
            }else {
                // 선택된 이미지의 uri경로를 얻어오기
                const source = {uri:response.uri};
                this.setState({img:source});
            }

        })

    }
}

const styles=StyleSheet.create({
    root:{
        flex:1,
        padding:16
    },
    img:{
        flex:1,
        marginTop:10
    },
    text:{
        margin:8,
        fontSize:20
    }
})