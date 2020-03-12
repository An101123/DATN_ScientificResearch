import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, FormGroup, Table } from "reactstrap";
import Form from "react-validation/build/form";
import ModalConfirm from "../../../components/modal/modal-confirm";
import Pagination from "../../../components/pagination/Pagination";
import ModalInfo from "../../../components/modal/modal-info";
import ValidationInput from "../../../components/common/validation-input";
import { toastSuccess, toastError } from "../../../helpers/toast.helper";
import lodash from "lodash";
import { getNewsList } from "../../../actions/news.list.action";
import ApiNews from "../../../api/api.news";
import { pagination } from "../../../constant/app.constant";
import "../../../pages/admin/select-custom.css";

class NewsListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDeleteModal: false,
      isShowInfoModal: false,
      item: {},
      itemId: null,
      params: {
        skip: pagination.initialPage,
        take: pagination.defaultTake
      },
      query: ""
    };
    this.delayedCallback = lodash.debounce(this.search, 1000);
  }

  toggleDeleteModal = () => {
    this.setState(prevState => ({
      isShowDeleteModal: !prevState.isShowDeleteModal
    }));
  };

  toggleModalInfo = (item, title) => {
    this.setState(prevState => ({
      isShowInfoModal: !prevState.isShowInfoModal,
      item: item || {},
      formTitle: title
    }));
  };

  onModelChange = el => {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let item = Object.assign({}, this.state.item);
    item[inputName] = inputValue;
    this.setState({ item });
  };

  search = e => {
    this.setState(
      {
        params: {
          ...this.state.params,
          skip: 1
        },
        query: e.target.value
      },
      () => {
        this.getNewsList();
      }
    );
  };

  onSearchChange = e => {
    e.persist();
    this.delayedCallback(e);
  };

  handlePageClick = e => {
    this.setState(
      {
        params: {
          ...this.state.params,
          skip: e.selected + 1
        }
      },
      () => this.getNewsList()
    );
  };

  getNewsList = () => {
    let params = Object.assign({}, this.state.params, {
      query: this.state.query
    });
    this.props.getNewsList(params);
  };

  onSubmit(e) {
    e.preventDefault();
    this.form.validateAll();
    this.saveNews();
  }

  componentDidMount() {
    this.getNewsList();
  }

  render() {
    const { isShowDeleteModal, isShowInfoModal, item } = this.state;
    const { newsPagedList } = this.props.newsPagedListReducer;
    const { sources, pageIndex, totalPages } = newsPagedList;
    console.log(sources);
    const hasResults =
      newsPagedList.sources && newsPagedList.sources.length > 0;
    return <div className="animated fadeIn"></div>;
  }
}

export default connect(
  state => ({
    newsPagedListReducer: state.newsPagedListReducer
  }),
  {
    getNewsList
  }
)(NewsListPage);
