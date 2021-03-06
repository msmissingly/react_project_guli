import React,{Component} from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqDeletePicture} from '../../ajax/index'

//getBase64用于将图片转为base64编码
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false, //是否展示预览框
    previewImage: '', //要预览图片的url或base64
    fileList: [ //fileList保存着所有已经上传完的图片
    ],
  };
  setImgs = (imgNameArr)=>{
    let result = []
    imgNameArr.forEach((imgName,index)=>{
      result.push({uid:-index,name:imgName,url:`/upload/${imgName}`})
    })
  }
  getImgNames=()=>{
    let result  = []
    this.state.fileList.forEach((imgObj)=>{
      result.push(imgObj.name)
    })
    return result
  }

	//预览框关闭按钮的回调
  handleCancel = () => this.setState({ previewVisible: false });

	//点击预览(小眼睛图标)按钮的回调
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

	/* 
		上传中、完成、失败都会调用这个函数。
	*/
  handleChange = async({file,fileList}) => {
    
    if(file.status==='removed'){
      let result = await reqDeletePicture(file.name)
      const {status,msg} = result
      if(status===0){
        message.success('删除成功！')
      }else{
        message.error(msg)
      }
    }
		if(file.status === 'done'){
      
			const {status,data,msg} = file.response
			const {name,url} = data
			if(status === 0){
				message.success('图片上传成功！')
				fileList[fileList.length-1].name = name
				fileList[fileList.length-1].url = url
			}else{
				message.error(msg)
			}
			console.log(fileList);//其中有用的为file的uid name url
		}
		this.setState({fileList});
	}

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload                         
			        action="/manage/img/upload"//上传地址
		          name="image"//上传参数
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
