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

import { css } from "@patternfly/react-styles";
import styles from "@patternfly/react-styles/css/components/DataList/data-list";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export interface DataListCheckProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "onChange"> {
  /** Additional classes added to the DataList item checkbox */
  className?: string;
  /** Flag to show if the DataList checkbox selection is valid or invalid */
  isValid?: boolean;
  /** Flag to show if the DataList checkbox is disabled */
  isDisabled?: boolean;
  /** Flag to show if the DataList checkbox is checked */
  isChecked?: boolean;
  /** Alternate Flag to show if the DataList checkbox is checked */
  checked?: boolean;
  /** A callback for when the DataList checkbox selection changes */
  onChange: (
    checked: boolean,
    event: React.FormEvent<HTMLInputElement>
  ) => void;
  /** Aria-labelledby of the DataList checkbox */
  "aria-labelledby": string;
}

export const MyDataListCheck: React.FunctionComponent<DataListCheckProps> = ({
  className = "",
  onChange,
  isValid = true,
  isDisabled = false,
  isChecked = false,
  checked = false,
  ...props
}: DataListCheckProps) => (
  <div className={css(styles.dataListItemControl, className)}>
    <div className={css("pf-c-data-list__check")}>
      <input
        {...props}
        type="checkbox"
        onChange={event => onChange(event.currentTarget.checked, event)}
        aria-invalid={!isValid}
        disabled={isDisabled}
        checked={isChecked || checked || false}
      />
    </div>
  </div>
)

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
      isEmptyResults: false,
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
      results: [{ "pant:transientPath": '', "pant:dateUploaded": '', "name": "", "jcr:title": "", "jcr:description": "", "sling:transientSource": "", "pant:transientSourceName": "", "checkedItem": false },
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
    const { isEmptyResults } = this.state;

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
                  {this.props.userAuthenticated && !this.state.isEmptyResults &&
                    <DataListCheck aria-labelledby="width-ex1-check1"
                      className="checkbox"
                      // isChecked={this.state.check}
                      checked={this.state.check}
                      aria-label="controlled checkbox example"
                      id="check"
                      // onClick={this.handleSelectAll}
                      onChange={this.handleSelectAll}
                      isDisabled={false}
                    />}
                  <DataListItemCells
                    dataListCells={[
                      <DataListCell width={2} key="title">
                        <button onClick={this.sortByName} className="sp-prop" id="span-name" aria-label="sort column by name">Name</button>
                      </DataListCell>,
                      <DataListCell width={2} key="description">
                        <button onClick={this.sortByDescription} className="sp-prop" id="span-name" aria-label="sort column by description">Description</button>
                      </DataListCell>,
                      <DataListCell key="resource source">
                        <span className="sp-prop-nosort" id="span-source-type">Source Type</span>
                      </DataListCell>,
                      <DataListCell key="source name">
                        <span className="sp-prop-nosort" id="span-source-name">Source Name</span>
                      </DataListCell>,
                      <DataListCell key="upload time">
                        <button onClick={this.sortByUploadTime} className="sp-prop" id="span-name" aria-label="sort column by upload time">Upload Time</button>
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
                    {this.props.userAuthenticated && !this.state.isEmptyResults &&
                      <DataListCheck aria-labelledby="width-ex3-check1"
                        className="checkbox"
                        // isChecked={data[Search.CHECKED_ITEM_KEY]}
                        checked={data[Search.CHECKED_ITEM_KEY]}
                        aria-label="controlled checkbox example"
                        id={data["pant:transientPath"]}
                        name={data["pant:transientPath"]}
                        // onClick={this.handleDeleteCheckboxChange(data["pant:transientPath"])}
                        onChange={this.handleDeleteCheckboxChange(data["pant:transientPath"])}
                      />}

                    <DataListItemCells key={data["pant:transientPath"]}
                      dataListCells={[
                        <DataListCell key="div-title" width={2}>
                          {this.props.userAuthenticated &&
                            <Link to={data['pant:transientPath']}>{data["jcr:title"]}</Link>}
                          {!this.props.userAuthenticated &&
                            <a href={"/" + data['pant:transientPath'] + ".preview"} target="_blank">{data["jcr:title"]}</a>}
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
                          <span >{this.formatDate(new Date(data["pant:dateUploaded"]))}</span>
                        </DataListCell>
                      ]}
                    />
                  </DataListItemRow>
                ))}
                {/* Delete button at the bottom */}
                <DataListItemRow id="data-rows" key={this.state.results["pant:transientPath"]}>
                      <Button variant="primary" >Delete</Button>
                </DataListItemRow>
                {isEmptyResults && (
                  <Level gutter="md">
                    <LevelItem />
                    <LevelItem>
                      <div className="notification-container">
                        <br />
                        <br />
                        <Alert
                          variant="warning"
                          title={"No modules found with your search of: " + this.state.input}
                          action={<AlertActionCloseButton onClose={this.dismissNotification} />}
                        />
                        <br />
                        <br />
                      </div></LevelItem>
                    <LevelItem />
                  </Level>

                )}
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

  private setInput = (event) => this.setState({ input: event });

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


  private formatDate(date: Date) {
    // 2019/05/07 14:21:36
    let dateStr = date.getFullYear().toString() + "/" +
      (date.getMonth() + 1).toString() + "/" +
      date.getDate().toString() + " " +
      date.getHours().toString() + ":" +
      date.getMinutes().toString() + ":" +
      date.getSeconds().toString()

    if (dateStr.includes("NaN")) {
      dateStr = ""
    }
    return dateStr
  };

  private dismissNotification = () => {
    this.setState({ isEmptyResults: false });
  };

  private sortByName = () => {
    this.sort("jcr:title")
  }

  private sortByDescription = () => {
    this.sort("jcr:description")
  }

  private sortByUploadTime = () => {
    this.sort("pant:dateUploaded")
  }

  private sort(key: string) {
    // console.log("My Sort Key is: " + key)
    // Switch the direction each time some clicks.
    this.setState({ isSortedUp: !this.state.isSortedUp, sortKey: key }, () => {
      this.getSortedRows()
    })
  };

  private getSortedRows() {
    fetch(this.buildSearchUrl())
      .then(response => response.json())
      .then(responseJSON => this.setState({ results: responseJSON.results, nextPageRowCount: responseJSON.hasNextPage ? 1 : 0 }))
      .then(() => {
        if (JSON.stringify(this.state.results) === "[]") {
          this.setState({
            data: [{ "pant:transientPath": '', "pant:dateUploaded": '', "name": "", "jcr:title": "", "jcr:description": "", "sling:transientSource": "", "pant:transientSourceName": "" }],
            isEmptyResults: true
          })
        } else {
          this.setState({ isEmptyResults: false })
        }
      })
  };

  private buildSearchUrl() {
    let backend = "/modules.json?search="
    if (this.state.input != null) {
      backend += this.state.input
    }
    backend += "&key=" + this.state.sortKey + "&direction=" + (this.state.isSortedUp ? "desc" : "asc")
    backend += "&offset=" + ((this.state.page - 1) * this.state.pageLimit) + "&limit=" + this.state.pageLimit
    // console.log('itemsPerPaeProp: '+this.state.pageLimit)
    // console.log(backend)
    return backend
  }
}
