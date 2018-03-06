import React, { Component } from 'react';
import { connect } from 'react-redux';
import { services } from "util/feathers";
import { Table } from 'reactstrap';
import TableRow from './TableRow';

class ServiceByName extends Component {

  componentDidMount () {
    const { match, dispatch } = this.props;
    const { name } = match.params;

    this.dispatchFind(name)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const { name } = nextProps.match.params;
      this.dispatchFind(name)
    }
  }

  dispatchFind = (name) => {
    const { dispatch } = this.props;
    return dispatch((services[name].find({ query: { $limit: 10 } })));
  }

  render() {
    const { match } = this.props;
    const service = this.props[match.params.name];
    const { data } = service.queryResult;
    const headTitles = (data[0] && Object.keys(data[0]));

    return (
      <div className="animated fadeIn">
        <Table bordered striped hover responsive>
          <thead>
            <tr>
              {headTitles && headTitles.map(headTitle => <th key={headTitle}>{headTitle}</th>)}
            </tr>
          </thead>
            <tbody>
            {data.map((item, idx) => <TableRow item={item} key={idx} />)}
          </tbody>
        </Table>
      </div>
    )
  }
}

const mapState = (state, props) => {
  const { name } = props.match.params;
  return {
    [name]: state[name] 
  }
}

export default connect(mapState)(ServiceByName);