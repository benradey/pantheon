import React, { Component } from 'react';
import {
  Alert, AlertActionCloseButton, Checkbox, TextInput,
  DataList, DataListItem, DataListItemRow, DataListItemCells,
  DataListCell, FormGroup, Button, DataListCheck, Modal,
  Level, LevelItem
} from '@patternfly/react-core';
import '@app/app.css';
import { BuildInfo } from './components/Chrome/Header/BuildInfo'
import { Pagination } from '@app/Pagination';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { App, IAppState } from '@app/app'

export default class Search extends Component<IAppState, any> {
  private static CHECKED_ITEM_KEY = "checkedItem"

  constructor(props) {
    super(props);
    this.state = {
      alertOneVisible: true,
      check: false,
      checkNextPageRow: "",
      columns: ['Name', 'Description', 'Source Type', 'Source Name', 'Upload Time'],
      confirmDelete: false,
      deleteState: '',
      initialLoad: true,
      input: '',
      isModalOpen: false,
      isSortedUp: true,
      moduleName: '',
      modulePath: '',
      moduleType: '',
      moduleUpdatedDate: '',
      nextPageRowCount: 1,
      page: 1,
      pageLimit: 25,
      redirect: false,
      redirectLocation: '',
      results: [
      { "pant:transientPath": 'tpath1', "pant:dateUploaded": 'date1', "name": "name1", "jcr:title": "title1", "jcr:description": "desc1", "sling:transientSource": "source1", "pant:transientSourceName": "sourcename1", "checkedItem": true },
      { "pant:transientPath": 'tpath2', "pant:dateUploaded": 'date2', "name": "name2", "jcr:title": "title2", "jcr:description": "desc2", "sling:transientSource": "source2", "pant:transientSourceName": "sourcename2", "checkedItem": false },
      { "pant:transientPath": 'tpath3', "pant:dateUploaded": 'date3', "name": "name3", "jcr:title": "title3", "jcr:description": "desc3", "sling:transientSource": "source3", "pant:transientSourceName": "sourcename3", "checkedItem": true },
      { "pant:transientPath": 'tpath4', "pant:dateUploaded": 'date4', "name": "name4", "jcr:title": "title4", "jcr:description": "desc4", "sling:transientSource": "source4", "pant:transientSourceName": "sourcename4", "checkedItem": false },
      { "pant:transientPath": 'tpath5', "pant:dateUploaded": 'date5', "name": "name5", "jcr:title": "title5", "jcr:description": "desc5", "sling:transientSource": "source5", "pant:transientSourceName": "sourcename5", "checkedItem": true }],
      showDropdownOptions: true,
      sortKey: ''
    };
  }

  public render() {

    return (
      <React.Fragment>
        <div>
          <div>
            <FormGroup
              label="Search Query"
              fieldId="search"
              helperText="Search is case sensitive. An empty search will show all modules."
            >
              <div className="row-view">
                <TextInput id="search" type="text" value={this.state.input} />
                <Button >Search</Button>
              </div>
            </FormGroup>
            <DataList aria-label="Simple data list" >
              <DataListItem aria-labelledby="simple-item1">
                <DataListItemRow id="data-rows-header" >
                    <DataListCheck aria-labelledby="width-ex1-check1"
                      className="checkbox"
                      // isChecked={this.state.check}
                      checked={this.state.check}
                      aria-label="controlled checkbox example"
                      id="check"
                      // onClick={this.handleSelectAll}
                      onChange={this.handleSelectAll}
                      isDisabled={false}
                    />
                  <DataListItemCells
                    dataListCells={[
                      <DataListCell width={2} key="title">
                        <button  className="sp-prop" id="span-name" aria-label="sort column by name">Name</button>
                      </DataListCell>,
                      <DataListCell width={2} key="description">
                        <button  className="sp-prop" id="span-name" aria-label="sort column by description">Description</button>
                      </DataListCell>,
                      <DataListCell key="resource source">
                        <span className="sp-prop-nosort" id="span-source-type">Source Type</span>
                      </DataListCell>,
                      <DataListCell key="source name">
                        <span className="sp-prop-nosort" id="span-source-name">Source Name</span>
                      </DataListCell>,
                      <DataListCell key="upload time">
                        <button  className="sp-prop" id="span-name" aria-label="sort column by upload time">Upload Time</button>
                      </DataListCell>,
                    ]}
                  />
                </DataListItemRow>
                {/* Delete button at the top */}
                <DataListItemRow id="data-rows" key={this.state.results["pant:transientPath"]}>
                      <Button variant="primary" >Delete</Button>
                </DataListItemRow>
                {this.state.results.map(data => (
                  <DataListItemRow id="data-rows">
                      <DataListCheck aria-labelledby="width-ex3-check1"
                        className="checkbox"
                        // isChecked={data[Search.CHECKED_ITEM_KEY]}
                        checked={data[Search.CHECKED_ITEM_KEY]}
                        aria-label="controlled checkbox example"
                        id={data["pant:transientPath"]}
                        name={data["pant:transientPath"]}
                        // onClick={this.handleDeleteCheckboxChange(data["pant:transientPath"])}
                        onChange={this.handleDeleteCheckboxChange(data["pant:transientPath"])}
                      />

                    <DataListItemCells key={data["pant:transientPath"]}
                      dataListCells={[
                        <DataListCell key="div-title" width={2}>
                            <Link to={data['pant:transientPath']}>{data["jcr:title"]}</Link>
                        </DataListCell>,
                        <DataListCell key="div-description" width={2}>
                          <span>{data["jcr:description"]}</span>
                        </DataListCell>,
                        <DataListCell key="div-transient-source">
                          <span>{data["pant:transientSource"]}</span>
                        </DataListCell>,
                        <DataListCell key="div-transient-source-name">
                          <span>{data["pant:transientSourceName"]}</span>
                        </DataListCell>,
                        <DataListCell key="div-created">
                          <span >--</span>
                        </DataListCell>
                      ]}
                    />
                  </DataListItemRow>
                ))}
                {/* Delete button at the bottom */}
                <DataListItemRow id="data-rows" key={this.state.results["pant:transientPath"]}>
                      <Button variant="primary" >Delete</Button>
                </DataListItemRow>
              </DataListItem>
            </DataList>
            <div className="notification-container">
              <BuildInfo />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  private handleSelectAll = (event) => {
    // console.log('handleSelectAll')
    this.setState({ check: !this.state.check }, () => {
      this.setState(prevState => {
        const selectAllcheck = this.state.results.map(dataitem => {
          // dataitem[Search.CHECKED_ITEM_KEY] = this.state.check
          dataitem[Search.CHECKED_ITEM_KEY] = false
          return dataitem
        })
        return {
          data: selectAllcheck
        }
      })

    })
    console.log('results:')
    console.log(this.state.results)
  }

  private handleDeleteCheckboxChange = (id) => (event: any) => {
    this.setState(prevState => {
      const updatedData = this.state.results.map(data => {
        if (data["pant:transientPath"] === id) {
          // data[Search.CHECKED_ITEM_KEY] = !data[Search.CHECKED_ITEM_KEY]
          data[Search.CHECKED_ITEM_KEY] = true
        }
        return data
      })
      return {
        data: updatedData
      }
    })
    console.log('results:')
    console.log(this.state.results)
  };

}
