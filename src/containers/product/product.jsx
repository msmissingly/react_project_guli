import React, { Component } from 'react'
import {PlusCircleOutlined,SearchOutlined} from '@ant-design/icons'
import { Card, Button, Select,Input,Table,message} from 'antd'
import {reqProductList,reqSearchProduct,reqChangeProdStatus} from '../../ajax/index'
import {PAGE_SIZE} from '../../config/index'
const {Option} = Select
export default class Product extends Component {
    state={
        productList:[],
        total:0,
        current:1,
        searchType:'productName',
        keyWord:'',
        
    }
    //商品信息item直接结构赋值
    changeStatus=async({_id,status})=>{
        if(status===1) status=2//上架改下架
        else status=1//下架改上架
        let result = await reqChangeProdStatus(_id,status) //请求更改状态
        if(result.status===0){
            message.success('操作成功！')
            let arr = [...this.state.productList]//获取商品列表
            arr.forEach((item)=>{//遍历商品列表，将与此id相同的商品的状态进行更改
                if(item._id === _id){
                    item.status = status
                }
            })
            this.setState({productList:arr})//更新商品列表的状态
        }else{
            message.error(result.msg)
        }
    }

    getProductList=async(number)=>{
        this.setState({current:number})
        let result 
        if(this.isSearch){
            const {keyWord,searchType} = this.state
            result = await reqSearchProduct(searchType,keyWord,number,PAGE_SIZE)
        }else{

            result = await reqProductList(number,PAGE_SIZE)
        }
        const {status,data,msg} = result
        if(status===0){
            const {total,list} = data
            this.setState({productList:list,total})
        }else{
            message.error(msg)
        }
    }

    componentDidMount(){
        this.getProductList(1)
    }
    render() {
       const dataSource = this.state.productList
        const columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
              key: 'name',
              width:'16%'
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
              key: 'desc',
              width:'65%'
            },
            {
              title: '价格',
              dataIndex: 'price',
              key: 'price',
              render:(price)=>'￥'+price
            },
             {
              title: '状态',
            //   dataIndex: 'status',
              align:'center',
              key: 'status',
              render:(item)=>{
                //   console.log(item)//item商品的信息
                  return(
                      <div>
                        <Button onClick={()=>{this.changeStatus(item)}} type={item.status===1?'danger':'primary'}>{item.status===1?'下架':'上架'}</Button>
                        <br/>
                        <span>{item.status===1?'在售':'售罄'}</span>
                      </div>
                  )
              }
            },
            {
                title: '操作',
                dataIndex: '_id',
                key: 'operate',
                align:'center',
                render:(id)=>(
                    <div>
                        <Button onClick={()=>{this.props.history.push(`/admin/prod_about/product/detail/${id}`)}} type="link">详情</Button>
						<br/>
						<Button onClick={()=>{this.props.history.push(`/admin/prod_about/product/update/${id}`)}} type="link">修改</Button>
                    </div>
                )
              }
          ];
        return (
            <div>
                <Card 
                    title={
                        <div>
                            <Select  onChange={(value)=>{this.setState({searchType:value})}} defaultValue='productName'>
                            <Option value="productName">按名称搜索</Option>
                            <Option value="productDesc">按描述搜索</Option>
                        </Select>
                        <Input  onChange={(event)=>{this.setState({keyWord:event.target.value})}} style={{width:'25%',marginLeft:'10px',marginRight:'10px'}} placeholder='请输入关键字进行搜索'/>
                        <Button onClick={()=>{this.isSearch=true;this.getProductList(1)}} type='primary'><SearchOutlined/>搜索</Button>
                        </div>
                    }
                    extra={
                        <Button type='primary' onClick={()=>{this.props.history.push('/admin/prod_about/product/add')}}>
                            <PlusCircleOutlined/>添加商品
                        </Button>
                        } 
                    >
                        <Table
                            bordered
                            dataSource={dataSource} 
                            columns={columns} 
                            pagination={{ //分页器
                                pageSize:PAGE_SIZE, //每页展示几条数据
                                total:this.state.total,
                                onChange:(number)=>{this.getProductList(number)},//页码改变的回调
                                current:this.state.current
                            }}
                            rowKey='_id'
				        />
                </Card>
            </div>
        )
    }
}
