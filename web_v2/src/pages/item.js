// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Row, Col, Button, FormGroup, Table } from 'reactstrap';
// import Form from 'react-validation/build/form';
// import ModalConfirm from '../../../components/modal/modal-confirm';
// import Pagination from '../../../components/pagination/Pagination';
// import ModalInfo from '../../../components/modal/modal-info';
// import ValidationInput from '../../../components/common/validation-input';
// import { toastSuccess, toastError } from '../../../helpers/toast.helper';
// import lodash from 'lodash';
// import { getItemList } from '../../../actions/item.list.action';
// import ApiItem from '../../../api/api.item';
// import { pagination } from '../../../constant/app.constant';
// import ApiMenu from '../../../api/api.menu';

// class ItemListPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isShowDeleteModal: false,
//       isShowInfoModal: false,
//       item: {},
//       menus: [],
//       params: {
//         skip: pagination.initialPage,
//         take: pagination.defaultTake
//       },
//       query: ''
//     };
//     this.delayedCallback = lodash.debounce(this.search, 1000);
//   }

//   toggleDeleteModal = () => {
//     this.setState(prevState => ({
//       isShowDeleteModal: !prevState.isShowDeleteModal
//     }));
//   };

//   toggleModalInfo = (item, title) => {
//     this.setState(prevState => ({
//       isShowInfoModal: !prevState.isShowInfoModal,
//       item: item || {},
//       formTitle: title
//     }));
//   };

//   toggleStatusButton = item => {
//     if (item.status){
//       return {
//         color: 'success'
//       }
//     }
//     return{
//       color: "warning"
//     }
//   }

//   changeStatus = el => {

//   }

//   showConfirmDelete = itemId => {
//     this.setState(
//       {
//         itemId: itemId
//       },
//       () => this.toggleDeleteModal()
//     );
//   };

//   showAddNew = () => {
//     let title = 'Create Item';
//     let item = {
//       name: '',
//       image: '',
//       description: ''
//     };
//     this.toggleModalInfo(item, title);
//   };

//   showUpdateModal = item => {
//     let title = 'Update Item';
//     this.toggleModalInfo(item, title);
//   };

//   onModelChange = el => {
//     let inputName = el.target.name;
//     let inputValue = el.target.value;
//     let item = Object.assign({}, this.state.item);
//     item[inputName] = inputValue;
//     this.setState({ item });
//   };

//   search = e => {
//     this.setState(
//       {
//         params: {
//           ...this.state.params,
//           skip: 1
//         },
//         query: e.target.value
//       },
//       () => {
//         this.getItemList();
//       }
//     );
//   };

//   onSearchChange = e => {
//     e.persist();
//     this.delayedCallback(e);
//   };

//   handlePageClick = e => {
//     this.setState(
//       {
//         params: {
//           ...this.state.params,
//           skip: e.selected + 1
//         }
//       },
//       () => this.getItemList()
//     );
//   };

//   getItemList = () => {
//     let params = Object.assign({}, this.state.params, {
//       query: this.state.query
//     });
//     this.props.getItemList(params);
//   };

//   getMenuList = () => {
//     ApiMenu.getAllMenu().then(values => {
//       this.setState({ menus: values });
//     });
//   };

//   addItem = async () => {
//     const { name, price, image, description, menuId } = this.state.item;
//     const item = { name, price, image, description, menuId };
//     console.log('item ==================');
//     console.log(item);
//     try {
//       await ApiItem.postItem(item);
//       this.toggleModalInfo();
//       this.getItemList();
//       toastSuccess('The item has been created successfully');
//     } catch (err) {
//       toastError(err + '');
//     }
//   };

//   updateItem = async () => {
//     const { id, name, price, status, image, description, menuId } = this.state.item;
//     const item = { id, name, price, status, image, description, menuId };
//     try {
//       await ApiItem.updateItem(item);
//       this.toggleModalInfo();
//       this.getItemList();
//       toastSuccess('The item has been updated successfully');
//     } catch (err) {
//       toastError(err + '');
//     }
//   };

//   deleteItem = async () => {
//     try {
//       await ApiItem.deleteItem(this.state.itemId);
//       this.toggleDeleteModal();
//       this.getItemList();
//       toastSuccess('The item has been deleted successfully');
//     } catch (err) {
//       toastError(err + '');
//     }
//   };

//   saveItem = () => {
//     console.log(this.state);
//     let { id } = this.state.item;
//     if (id) {
//       this.updateItem();
//     } else {
//       this.addItem();
//     }
//   };

//   onSubmit(e) {
//     e.preventDefault();
//     this.form.validateAll();
//     this.saveItem();
//   }

//   componentDidMount() {
//     this.getItemList();
//     this.getMenuList();
//   }

//   render() {
//     const { isShowDeleteModal, isShowInfoModal, item, menus } = this.state;
//     const { itemPagedList } = this.props.itemPagedListReducer;
//     const { sources, pageIndex, totalPages } = itemPagedList;
//     const hasResults = itemPagedList.sources && itemPagedList.sources.length > 0;

//     console.log(sources);
//     return (
//       <div className='animated fadeIn'>
//         <ModalConfirm clickOk={this.deleteItem} isShowModal={isShowDeleteModal} toggleModal={this.toggleDeleteModal} />

//         <ModalInfo title={this.state.formTitle} isShowModal={isShowInfoModal} hiddenFooter>
//           <div className='modal-wrapper'>
//             <div className='form-wrapper'>
//               <Form
//                 onSubmit={e => this.onSubmit(e)}
//                 ref={c => {
//                   this.form = c;
//                 }}
//               >
//                 <Row>
//                   <Col>
//                     <FormGroup>
//                       <ValidationInput
//                         name='name'
//                         title='Name'
//                         type='text'
//                         required={true}
//                         value={item.name}
//                         onChange={this.onModelChange}
//                       />
//                     </FormGroup>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <Col>
//                     <FormGroup>
//                       <ValidationInput
//                         name='price'
//                         title='Price'
//                         type='number'
//                         required={true}
//                         value={item.price}
//                         onChange={this.onModelChange}
//                       />
//                     </FormGroup>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <Col>
//                     <FormGroup>
//                       <ValidationInput
//                         name='image'
//                         title='Image'
//                         type='text'
//                         value={item.image}
//                         onChange={this.onModelChange}
//                       />
//                     </FormGroup>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <Col>
//                     <FormGroup>
//                       <ValidationInput
//                         name='description'
//                         title='Description'
//                         type='text'
//                         value={item.description}
//                         onChange={this.onModelChange}
//                       />
//                     </FormGroup>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <Col>
//                     <FormGroup>
//                       <select name='menuId' onChange={this.onModelChange}>
//                         <option key='null' selected={true}>
//                           --Select Menu--
//                         </option>
//                         {menus.length > 0
//                           ? menus.map((menu, i) => (
//                               <option key={i} value={menu.id}>
//                                 {menu.name}
//                               </option>
//                             ))
//                           : ''}
//                       </select>
//                     </FormGroup>
//                   </Col>
//                 </Row>

//                 <div className='text-center'>
//                   <Button color='danger' type='submit'>
//                     Confirm
//                   </Button>{' '}
//                   <Button color='secondary' onClick={this.toggleModalInfo}>
//                     Cancel
//                   </Button>
//                 </div>
//               </Form>
//             </div>
//           </div>
//         </ModalInfo>

//         <Row>
//           <Col xs='12'>
//             <div className='flex-container header-table'>
//               <Button onClick={this.showAddNew} className='btn btn-pill btn-success btn-sm'>
//                 Create
//               </Button>
//               <input
//                 onChange={this.onSearchChange}
//                 className='form-control form-control-sm'
//                 placeholder='Tìm kiếm...'
//               />
//             </div>
//             <Table className='admin-table' responsive bordered>
//               <thead>
//                 <tr>
//                   <th>Item name</th>
//                   <th>Price</th>
//                   <th>Status</th>
//                   <th>Description</th>
//                   <th>Menu</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {hasResults &&
//                   sources.map(item => {
//                     return (
//                       <tr key={item.id}>
//                         <td>{item.name}</td>
//                         <td>{item.price}</td>
//                         <td>{item.status ? 'Available' : 'Not available'}</td>
//                         <td>{item.description}</td>
//                         <td>{item.menu.name}</td>
//                         <td>
//                         <Button className='btn-sm' style={this.toggleStatusButton(item)} onClick={() => this.showUpdateModal(item)}>
//                             Change status
//                           </Button>
//                           <Button className='btn-sm' color='secondary' onClick={() => this.showUpdateModal(item)}>
//                             Edit
//                           </Button>
//                           <Button className='btn-sm' color='danger' onClick={() => this.showConfirmDelete(item.id)}>
//                             Delete
//                           </Button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//               </tbody>
//             </Table>
//             {hasResults && totalPages > 1 && (
//               <Pagination
//                 initialPage={0}
//                 totalPages={totalPages}
//                 forcePage={pageIndex - 1}
//                 pageRangeDisplayed={2}
//                 onPageChange={this.handlePageClick}
//               />
//             )}
//           </Col>
//         </Row>
//       </div>
//     );
//   }
// }

// export default connect(
//   state => ({
//     itemPagedListReducer: state.itemPagedListReducer
//   }),
//   {
//     getItemList
//   }
// )(ItemListPage);
