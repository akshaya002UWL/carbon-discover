import React, { useState, useEffect } from "react";
import {
  InlineNotification,
  RadioButtonGroup,
  RadioButton,
  TextInput,
  Toggle,
  NumberInput,
  Row,
  Modal,
  Column,
} from "carbon-components-react";
import { CreateFullPage, CreateFullPageStep } from "@carbon/ibm-products";
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableSelectRow,
} from "@carbon/react";
import { Button } from "@carbon/react";
import { CodeSnippet } from "@carbon/react";

import "./_example.scss";

const blockClass = `full-page-example`;

export const BAW = () => {
  const [simulatedDelay] = useState(750);
  const [shouldReject, setShouldReject] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [connection, setConnection] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [topicDescriptionValue, setTopicDescriptionValue] = useState("");
  const [topicVersionValue, setTopicVersionValue] = useState("");
  const [stepTwoTextInputValue, setStepTwoTextInputValue] = useState(1);
  const [stepThreeTextInputValue, setStepThreeTextInputValue] =
    useState("one-day");
  const [isInvalid, setIsInvalid] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [opRowData, setOpRowData] = useState([]);
  const [url, setUrl] = useState("");

  const clearCreateData = () => {
    setUsername("");
    setPassword("");
    setConnection("");
    setTopicDescriptionValue("");
    setTopicVersionValue("");
    setStepTwoTextInputValue(1);
    setStepThreeTextInputValue("one-day");
    setHasSubmitError(false);
    setIsInvalid(false);
  };
  useEffect(() => {
    fetch(
      "https://recruitement-fsw-https-recruitment.cp4ba-mission-16bf47a9dc965a843455de9f2aef2035-0000.eu-de.containers.appdomain.cloud/common-assets"
    )
      .then((response) => response.json())
      .then((data) => {
        setRowData(data.common_assets);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function getFullDetails(row) {
    console.log(row);
    fetch(
      "https://recruitement-fsw-https-recruitment.cp4ba-mission-16bf47a9dc965a843455de9f2aef2035-0000.eu-de.containers.appdomain.cloud/detail?id=" +
        row.id
    )
      .then((response) => response.json())
      .then((data) => {
        let opData = [];
        data.common_assets.map((allData) => {
          let name = allData.name;
          let sub_type = allData.sub_type;
          let id = allData.id;
          let project_name = allData?.origin?.snapshot?.project_name;
          allData.operations.map((operations) => {
            opData.push({
              id: id,
              name: name,
              sub_type: sub_type,
              op_name: operations.op_name,
              parm_name: operations.op_parms[0].parm_name,
              parm_type: operations.op_parms[0].parm_type,
              project_name: project_name,
            });
          });
        });

        setOpRowData(opData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  const headerData = [
   
    {
      key: "type",
      header: "Type",
    },
    {
      key: "name",
      header: "Name",
    },
    {
      key: "version",
      header: "Version",
    },
    {
      key: "sub_type",
      header: "SubType",
    },
  ];
  const headerOp = [
    {
      key: "op_name",
      header: "Operation",
    },
    {
      key: "parm_name",
      header: "Parameter",
    },
    {
      key: "parm_type",
      header: "Parameter Type",
    },
  ];
  const openSpecDetails = (row, i) => {
    console.log(opRowData[i]);

    {
      /* +"bawaut/automationservices/rest/<project_name>/<name>/docs?openAPIVersion=4 */
    }
    let spec_url = connection.endsWith("/") ? connection : connection + "/";
    spec_url =
      spec_url +
      "bawaut/automationservices/rest/<project_name>/<name>/docs?openAPIVersion=3";
    let replace_projectname = spec_url.replace(
      "<project_name>",
      opRowData[i].project_name
    );
    let replaced_name = replace_projectname.replace(
      "<name>",
      opRowData[i].name
    );
    setUrl(replaced_name);
    setShowModal(true);
  };

  return (
    <>
      <CreateFullPage
        className={blockClass}
        submitButtonText="Create"
        cancelButtonText="Cancel"
        backButtonText="Back"
        nextButtonText="Next"
        title="Create topic"
        modalDangerButtonText="Cancel partition"
        modalSecondaryButtonText="Return to form"
        modalTitle="Are you sure you want to cancel?"
        modalDescription="If you cancel, the information you have entered won't be saved."
        onClose={clearCreateData}
        onRequestSubmit={() =>
          new Promise((resolve) => {
            setTimeout(() => {
              clearCreateData();
              resolve();
            }, simulatedDelay);
          })
        }
      >
        <CreateFullPageStep
          className={`${blockClass}__step-fieldset--no-label`}
          title="Connection"
          subtitle="This page reads the connection details to BAW"
          description="It uses the username and password for connection and connection string is used to generate open api spec."
          fieldsetLegendText="Topic name"
          onNext={() => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                // Example usage of how to prevent the next step if some kind
                // of error occurred during the `onNext` handler.
                if (shouldReject) {
                  setHasSubmitError(true);
                  reject("Simulated error");
                }
                setIsInvalid(false);
                resolve();
              }, simulatedDelay);
            });
          }}
          disableSubmit={!userName || !password || !connection}
        >
          <Row>
            <Column xlg={5} lg={5} md={4} sm={4}>
              <TextInput
                labelText="Username"
                id="tearsheet-multi-step-story-text-input-multi-step-1"
                value={userName}
                placeholder="Enter user name"
                onChange={(event) => {
                  if (event.target.value.length) {
                    setIsInvalid(false);
                  }
                  setUsername(event.target.value);
                }}
                invalid={isInvalid}
                invalidText="This is a required field"
                onBlur={() => {
                  if (!userName.length) {
                    setIsInvalid(true);
                  }
                }}
              />
              <TextInput
                labelText="Password"
                id="tearsheet-multi-step-story-text-input-multi-step-1"
                value={password}
                placeholder="Enter password"
                onChange={(event) => {
                  if (event.target.value.length) {
                    setIsInvalid(false);
                  }
                  setPassword(event.target.value);
                }}
                invalid={isInvalid}
                invalidText="This is a required field"
                onBlur={() => {
                  if (!password.length) {
                    setIsInvalid(true);
                  }
                }}
              />
              <TextInput
                labelText="Connection string"
                id="tearsheet-multi-step-story-text-input-multi-step-1"
                value={connection}
                placeholder="Enter connection string"
                onChange={(event) => {
                  if (event.target.value.length) {
                    setIsInvalid(false);
                  }
                  setConnection(event.target.value);
                }}
                invalid={isInvalid}
                invalidText="This is a required field"
                onBlur={() => {
                  if (!connection.length) {
                    setIsInvalid(true);
                  }
                }}
              />
              {hasSubmitError && (
                <InlineNotification
                  lowContrast
                  kind="error"
                  title="Error"
                  subtitle="Resolve errors to continue"
                  onClose={() => setHasSubmitError(false)}
                />
              )}
            </Column>
          </Row>
        </CreateFullPageStep>
        <CreateFullPageStep
          className={`${blockClass}__step-fieldset--no-label`}
          title="Exposed Automation Service"
          subtitle="List of Exposed APIs."
          description="This section display the type,name,version and sub type of exposed api service."
          fieldsetLegendText="Partitions"
        >
          <Row>
            <Column xlg={3} lg={3} md={3} sm={3}>
              <DataTable rows={rowData} headers={headerData} radio>
                {({
                  rows,
                  headers,
                  getHeaderProps,
                  getTableProps,
                  getRowProps,
                  getSelectionProps,
                }) => (
                  <TableContainer title="Exposed">
                    <Table {...getTableProps()}>
                      <TableHead>
                        <TableRow>
                            <TableHeader></TableHeader>
                          {headers.map((header) => (
                            <TableHeader {...getHeaderProps({ header })}>
                              {header.header}
                            </TableHeader>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row, i) => (
                          <TableRow key={i} {...getRowProps({ row })}>
                            <TableSelectRow
                              {...getSelectionProps({ row })}
                              onSelect={(evt) => {
                                getFullDetails(row);
                                getSelectionProps({ row }).onSelect(evt);
                              }}
                            />
                            {row.cells.map((cell) => (
                              <TableCell key={cell.id}>{cell.value}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </DataTable>
            </Column>
          </Row>
        </CreateFullPageStep>
        <CreateFullPageStep
          className={`${blockClass}__step-fieldset--no-label`}
          title="Open API"
          subtitle="List of apis and its operational details."
          description="If you want to get open api spec url just click on OpenAPI URL in the table."
          fieldsetLegendText="Message retention"
          disableSubmit={!stepThreeTextInputValue}
          onNext={() => Promise.resolve()}
        >
          <DataTable rows={opRowData} headers={headerOp}>
            {({ rows, headers, getHeaderProps, getTableProps }) => (
              <TableContainer title="Get Spec details">
                <Table {...getTableProps()}>
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => (
                        <TableHeader {...getHeaderProps({ header })}>
                          {header.header}
                        </TableHeader>
                      ))}
                      <TableHeader>URL</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, i) => (
                      <TableRow key={i}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                        <Button
                          kind="tertiary"
                          size="sm"
                          onClick={(e) => openSpecDetails(row, i)}
                        >
                          OpenAPI URL
                        </Button>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DataTable>
        </CreateFullPageStep>
      </CreateFullPage>
      <div>
        <Modal
          modalHeading="OpenAPI URL"
          open={showModal}
          onRequestClose={(e) => setShowModal(false)}
          passiveModal
        >
          <p>
            {" "}
            <CodeSnippet type="single">
            <a href={url} >{url}</a></CodeSnippet>
          </p>
        </Modal>
      </div>
    </>
  );
};
