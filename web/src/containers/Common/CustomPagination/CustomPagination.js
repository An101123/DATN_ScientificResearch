import React, { Component } from "react";

class CustomPagination extends Component {

  buttonNextAndPrevious = (label, name, pageIndex, totalPages, onPageChange, disabled) => (
    <li className={`page-item ${!disabled ? 'disabled' : ''}`}>
      <button onClick=
        {
          name === 'Prev' ? () => onPageChange(pageIndex === 1 ? pageIndex : pageIndex - 1)
            :
            () => onPageChange(pageIndex === totalPages ? pageIndex : pageIndex + 1)
        }
        className="page-link" aria-label={label}>
        <span aria-hidden="true">{name}</span>
        <span className="sr-only">{label}</span>
      </button>
    </li>)
  


  render() {
    const { hasNextPage, hasPreviousPage, totalPages, pageIndex, onPageChange } = this.props;
    let component = [];
    for (let i = 1; i <= totalPages; i++) {
      component.push(
        <li className={`page-item ${i === pageIndex ? 'active' : ''}`} key={i}>
          <button onClick={() => onPageChange(i)} className="page-link">{i}</button>
        </li>
      )
    }
    return (
      totalPages !== 0 && (
        totalPages <= 1 ? '' :
          <nav aria-label="pagination">
            <ul className="pagination">
              {
                this.buttonNextAndPrevious("Previous", "Prev", pageIndex, totalPages, onPageChange, hasPreviousPage)
              }
              {component}
              {
                this.buttonNextAndPrevious("Next", "Next", pageIndex, totalPages, onPageChange, hasNextPage)
              }
            </ul>
          </nav>
      )
    )
  }
}

export default CustomPagination;