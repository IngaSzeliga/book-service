import React, { PureComponent } from "react";
import Pagination from "material-ui-flat-pagination";
import { numberOfItemPerPage } from "../../config/constants";

class PaginationBar extends PureComponent {
  state = { offset: 0 };

  handleClick(offset) {
    const { changePage } = this.props;
    changePage(offset);
    this.setState({ offset });
  }

  render() {
    return (
      <Pagination
        limit={numberOfItemPerPage}
        offset={this.state.offset}
        total={16}
        onClick={(e, offset) => this.handleClick(offset)}
      />
    );
  }
}

export default PaginationBar;
