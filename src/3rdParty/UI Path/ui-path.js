import React, { useState, useRef, useMemo, useEffect } from "react";
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
  TableExpandedRow,
  TableExpandRow,
} from "@carbon/react";
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
} from "@carbon/react";

import { Button } from "@carbon/react";
import { CodeSnippet } from "@carbon/react";
import "../../scss/_discover.scss";

const blockClass = `full-page-example`;

export const UIPath = () => {
  const [simulatedDelay] = useState(750);
  const [shouldReject, setShouldReject] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [clientID, setClientID] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [access_token, setToken] = useState("");
  const [folderDetails, setFolderDetails] = useState([]);
  const [release, setRelease] = useState([]);
  const [process, setProcess] = useState([]);
  const [folder_id, setFolder_id] = useState([]);
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState("");
  const [botTable, setShowBotTable] = useState(false);

  const [stepThreeTextInputValue, setStepThreeTextInputValue] =
    useState("one-day");
  const [isInvalid, setIsInvalid] = useState(false);

  const url = "";
  const base_url = `https://discoverapi-discover-api.cp4ba-mission-16bf47a9dc965a843455de9f2aef2035-0000.eu-de.containers.appdomain.cloud/`;

  const clearCreateData = () => {
    setClientID("");
    setRefreshToken("");
    setTopicDescriptionValue("");
    setTopicVersionValue("");
    setStepTwoTextInputValue(1);
    setStepThreeTextInputValue("one-day");
    setHasSubmitError(false);
    setIsInvalid(false);
    setToken("");
    setGrantType("");
    setRefreshToken("");
    setClientID("");
  };

  const folderHeader = [
    {
      key: "DisplayName",
      header: "DisplayName",
    },
    {
      key: "Description",
      header: "Description",
    },
  ];

  const releaseHeader = [
    {
      key: "Name",
      header: "Name",
    },
    {
      key: "Description",
      header: "Description",
    },
    {
      key: "CreationDate",
      header: "Creation date",
    },
  ];
  const botHeader = [
    {
      key: "ReleaseName",
      header: "Name",
    },
    {
      key: "State",
      header: "State",
    },
    {
      key: "CreationDate",
      header: "Creation date",
    },
  ];
  var button = document.getElementsByClassName("bx--btn bx--btn--secondary")[0];
  button?.addEventListener("click", () => {
    setShowCode(false);
    setProcess([]);
    setShowBotTable(false);
  });
  function exportUserInfo() {
    const fileData = JSON.stringify(code);
    const blob = new Blob([fileData], { type: "text/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "open-api.json";
    link.href = url;
    link.click();
  }
  const openSpecDetails = (row, i) => {
    fetch(`${base_url}ui-spec`)
      .then((response) => response.json())
      .then((data) => {
        const codeSnippet = `${JSON.stringify(data)}`;
        setCode(codeSnippet);
        setShowCode(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function folders(token) {
    const url = base_url + "/folders";
    // console.log(access_token);
    fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.value?.length) {
          data?.value?.map((folder) => {
            folder.id = folder.Id;
          });
          setFolderDetails(data.value);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function authenticate() {
    const url = base_url + "auth";

    const payload = {
      client_id: clientID,
      refresh_token: refreshToken,
    };
    fetch(url, {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (data?.error) {
          console.log(data);
        } else {
          console.log(data);
          setToken(data?.access_token);
          folders(data?.access_token);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  function releases(data) {
    const url = base_url + "/Releases?release=" + data.id;
    setFolder_id(data.id);
    fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data?.value.map((release) => {
          release.id = release.Id;
          release.CreationDate = release.CreationTime.substring(0, 10);
          if (release?.Arguments?.Input) {
            release.argument = JSON.parse(release?.Arguments?.Input);
            release.argument.map((item) =>{
              let splitALl = item?.type?.split(".")
              let type  = splitALl[1].split(",")
              item.type =type[0]
            }
            )
            console.log(release.argument);
          } else {
            release.argument = [];
          }
        });
        setRelease(data.value);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  function startProcess(row) {
    setShowBotTable(false);
    const url = base_url + "/StartProcess";
    const rkey = release.find((x) => x.Id == row.id);
    fetch(url, {
      method: "post",
      body: JSON.stringify({
        folder_id: String(folder_id),
        key: rkey.Key,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data?.value.map((bot) => {
          bot.id = bot.Id;
          bot.CreationDate = bot.CreationTime.substring(0, 10);
        });
        setShowBotTable(true);
        setProcess(data.value);
      })
      .catch((err) => {
        console.log(err);
        setHasSubmitError(true);
      });
  }
  return (
    <>
      <CreateFullPage
        className={blockClass}
        submitButtonText="Train"
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
          subtitle="Connect to an existing UIPath Server to discover bots."
          description="Please enter your Client id, and Refresh token to get started."
          fieldsetLegendText="Topic name"
          onNext={async () => {
            if (!access_token?.length) {
              await authenticate();
            }
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
          disableSubmit={!clientID || !refreshToken}
        >
          <Row>
            <Column xlg={5} lg={5} md={4} sm={4}>
              {/* <TextInput
                labelText="Grant Type"
                id="tearsheet-multi-step-story-text-input-multi-step-1"
                value={grantType}
                placeholder="Enter grant type"
                onChange={(event) => {
                  if (event.target.value.length) {
                    setIsInvalid(false);
                  }
                  setGrantType(event.target.value);
                }}
                invalid={isInvalid}
                invalidText="This is a required field"
                onBlur={() => {
                  if (!grantType.length) {
                    setIsInvalid(true);
                  }
                }}
              /> */}
              <TextInput
                labelText="Client id"
                id="tearsheet-multi-step-story-text-input-multi-step-1"
                value={clientID}
                placeholder="Enter client id"
                onChange={(event) => {
                  if (event.target.value.length) {
                    setIsInvalid(false);
                  }
                  setClientID(event.target.value);
                }}
                invalid={isInvalid}
                invalidText="This is a required field"
                onBlur={() => {
                  if (!clientID.length) {
                    setIsInvalid(true);
                  }
                }}
              />
              <TextInput
                labelText="User key"
                id="tearsheet-multi-step-story-text-input-multi-step-1"
                value={refreshToken}
                placeholder="Enter user key"
                onChange={(event) => {
                  if (event.target.value.length) {
                    setIsInvalid(false);
                  }
                  setRefreshToken(event.target.value);
                }}
                invalid={isInvalid}
                invalidText="This is a required field"
                onBlur={() => {
                  if (!refreshToken.length) {
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
          subtitle="List of Folders."
          description="This section display the details of folders."
          fieldsetLegendText="FolderDetails"
          // onMount={async () => {
          //   if (access_token?.length) {
          //     console.log("kkk");
          //     await folders();
          //   } else {
          //     console.log("hhhh");
          //     setTimeout(async () => {
          //       authenticate();
          //       if (access_token?.length) {
          //         await folders();
          //       }
          //     }, 2000);
          //   }
          // }}
        >
          <Row>
            <Column xlg={3} lg={3} md={3} sm={3}>
              <DataTable rows={folderDetails} headers={folderHeader} radio>
                {({
                  rows,
                  headers,
                  getHeaderProps,
                  getTableProps,
                  getRowProps,
                  getSelectionProps,
                }) => (
                  <TableContainer title="Folder Details">
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
                        {rows?.map((row, i) => (
                          <TableRow key={i} {...getRowProps({ row })}>
                            <TableSelectRow
                              {...getSelectionProps({ row })}
                              onSelect={(evt) => {
                                releases(row);
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
              {/* )} */}
            </Column>
          </Row>
        </CreateFullPageStep>
        <CreateFullPageStep
          className={`${blockClass}__step-fieldset--no-label`}
          title="Bot details"
          subtitle="By selecting any release the bot will start fetching the open api spec details."
          description=""
          fieldsetLegendText="Message retention"
          disableSubmit={!stepThreeTextInputValue}
          onMount={() => {}}
          onNext={() => Promise.resolve()}
        >
          <DataTable rows={release} headers={releaseHeader} radio>
            {({
              rows,
              headers,
              getHeaderProps,
              getTableProps,
              getRowProps,
              getSelectionProps,
            }) => (
              <TableContainer title="OpenAPI">
                <Table {...getTableProps()}>
                  <TableHead>
                    <TableRow>
                      <TableHeader></TableHeader>
                      {headers.map((header) => (
                        <TableHeader {...getHeaderProps({ header })}>
                          {header.header}
                        </TableHeader>
                      ))}
                      <TableHeader></TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, i) => (
                      <>
                        <React.Fragment key={i + row.id}>
                          <TableExpandRow {...getRowProps({ row })}>
                            {row.cells.map((cell) => (
                              <TableCell key={cell.id}>{cell.value}</TableCell>
                            ))}
                            <TableCell>
                              {" "}
                              <Button
                                kind="tertiary"
                                size="sm"
                                onClick={(e) => startProcess(row)}
                              >
                                Start process
                              </Button>
                            </TableCell>
                          </TableExpandRow>
                          <TableExpandedRow
                            colSpan={headers.length + 3}
                            className="demo-expanded-td"
                          >
                            <h6>Parameter details</h6>
                            {release[i]?.argument.length ? (
                              <>
                                {release[i]?.argument.map((item) => (
                                  <>
                                    <p>
                                      {item.name} : {item.type}
                                    </p>
                                  </>
                                ))}
                              </>
                            ) : (
                              <p>Nil</p>
                            )}
                          </TableExpandedRow>
                        </React.Fragment>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DataTable>
          <div style={{ marginTop: "5em" }}>
            {botTable && (
              <DataTable rows={process} headers={botHeader}>
                {({
                  rows,
                  headers,
                  getHeaderProps,
                  getTableProps,
                  getRowProps,
                  getTableContainerProps,
                }) => (
                  <TableContainer
                    title="Bot Process"
                    {...getTableContainerProps()}
                  >
                    <Table {...getTableProps()}>
                      <TableHead>
                        <TableRow>
                          {headers.map((header) => (
                            <TableHeader {...getHeaderProps({ header })}>
                              {header.header}
                            </TableHeader>
                          ))}
                          <TableHeader></TableHeader>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row, i) => (
                          <TableRow key={row.id}>
                            {row.cells.map((cell) => (
                              <TableCell key={cell.id}>{cell.value}</TableCell>
                            ))}
                            <TableCell>
                              <Button
                                style={{ "margin-right": "5px" }}
                                kind="tertiary"
                                size="sm"
                                onClick={(e) => openSpecDetails(row, i)}
                              >
                                View File
                              </Button>
                              <Button
                                size="sm"
                                kind="tertiary"
                                onClick={() => {
                                  exportUserInfo();
                                }}
                              >
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </DataTable>
            )}
          </div>
          <div style={{ marginTop: "5em" }}>
            {showCode && (
              <div>
                <CodeSnippet type="multi">
                  <p style={{ whiteSpace: "pre-line" }}>{code}</p>
                </CodeSnippet>
              </div>
            )}
          </div>
        </CreateFullPageStep>
      </CreateFullPage>
    </>
  );
};
