import React, { Component } from 'react'
import {Card,Table, Button,Modal,Form,Input,message} from 'antd';
import {connect} from 'react-redux'
import {reqAddCategory,reqUpdateCategory} from '../../ajax/index'
import {PlusCircleOutlined} from '@ant-design/icons';
import {createSaveCategoryAsyncAction}from '../../redux/actions/category'
import {PAGE_SIZE} from '../../config/index'


const {Item } = Form
 class Category extends Component {
     state={
        visible:false
     }

    showModal=(categoryObj)=>{
        
        const {_id,name} = categoryObj
        //进入此判断，为修改操作
        if(_id&&name){
            this._id = _id
            this.name = name
            this.isUpdate = true
            //获取Form节点(第一次获取不到)
            const {categoryForm} = this.refs
            //第一次以后靠这行代码回显数据
            if(categoryForm) categoryForm.setFieldsValue({categoryName:name})//设置表单的值
        }
        this.setState({visible:true})
    }
    handleOk=async()=>{
        let {categoryName} = this.refs.categoryForm.getFieldsValue()//获取用户输入
        if(!categoryName.trim()){ message.warning('分类名不能为空！');return}//校验
        let result
        //isUpdate为true,则发送修改分类请求 false,为请求添加分类请求
        if(this.isUpdate){
            result = await reqUpdateCategory(this._id,categoryName)
        }else{
            result = await reqAddCategory(categoryName)
        }
         
        const {status,msg} = result
        if(status===0){
            message.success('新增分类成功！')
            this.props.saveCategory()
            this.handleCancel()
        }else{
            message.warning(msg)
        }
    }
    handleCancel=()=>{
      this.refs.categoryForm.setFieldsValue({categoryName:''})
      this.isUpdate = false//重置为新增
      this._id = ''
      this.name=''
      this.setState({visible:false})
    }
    
    
    componentDidMount(){
        this.props.saveCategory()
    }   
    
    render() {
          const columns = [
            {
              title: '分类名称',
              dataIndex: 'name',
              key: 'name',
              
            },
            {
              title: '操作',
            //   dataIndex: 'operate',
              key: 'operate',
              width:'25%',
              align:'center',
              //item 当dataIndex赋值时为dataIndex的值，不赋值为所有的dataIndex的值
              render:(item)=><Button onClick={()=>{this.showModal(item)}} type="link">修改分类</Button>
            },
           
          ];
          
          
        return (
            <div>
               <Card
                     extra={
                        <Button onClick={this.showModal} type='primary'>
                        <PlusCircleOutlined/>添加分类
                        </Button>}
                >
                    <Table 
                        bordered
                        dataSource={this.props.categoryList}
                        columns={columns}
                        pagination={{
                            pageSize:PAGE_SIZE,
                            showQuickJumper:true
                        }}
                        rowKey='_id'

                    />
                    
                </Card>
                {/* 弹窗 */}
                <Modal
                    title={this.isUpdate ? '修改分类': '新增分类'}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText='确认'
                    cancelText='取消'
                >
                    <Form
                        ref='categoryForm'
                        initialValues={{//表单默认值，初始化和重置时有效
							categoryName:this.name
						}}
                    >
                       <Item 
                            name='categoryName'
                            rules={[{required:true,message:'分类名称不能为空！'}]}
                       >
                           <Input placeholder="请输入分类名称"/>
                       </Item>
                    </Form>     
                </Modal>
                
            </div>
        )
    }
}
export default connect(
    state=>({
        categoryList:state.categoryList
    }),
    {
        saveCategory:createSaveCategoryAsyncAction
    }
)(Category)
