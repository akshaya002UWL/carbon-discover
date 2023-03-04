import React from "react";

import { Column, Grid } from "carbon-components-react";
import {
  ClickableTile,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  Button,
} from "@carbon/react";

export const LandingPage = () => {
  return (
    <>
      <Grid className="landing-page" fullWidth>
        <Column lg={16} md={8} sm={4} className="landing-page__banner">
          <h1 className="landing-page__heading">Discover</h1>
        </Column>
        <Column lg={16} md={8} sm={4} className="landing-page__r2">
          <Tabs defaultSelectedIndex={0}>
            <TabPanels>
              <TabPanel>
                <Grid
                  className="tabs-group-content"
                  style={{ marginLeft: "-5em" }}
                >
                  <Column
                    md={4}
                    lg={7}
                    sm={4}
                    className="landing-page__tab-content"
                    style={{ marginTop: "3em" }}
                  >
                    <h2 className="landing-page__subheading">
                      What is Discover?
                    </h2>
                    <p className="landing-page__p">
                      Carbon is IBM’s open-source design system for digital
                      products and experiences. With the IBM Design Language as
                      its foundation, the system consists of working code,
                      design tools and resources, human interface guidelines,
                      and a vibrant community of contributors.
                    </p>
                    <Button style={{ marginTop: "3em" }}>Learn more</Button>
                  </Column>
                  <Column md={4} lg={{ span: 8, offset: 7 }} sm={4} style={{marginTop:'3em'}}>
                  <ClickableTile href="/baw" style={{marginRight:'3em'}}>
                    <h6>BAW</h6>
                    <div class="cds--resource-card__icon--action"><svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Open resource" width="20" height="20" viewBox="0 0 20 20" role="img"><path d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path></svg></div>
                  </ClickableTile>
                  <ClickableTile href="/ui-path"><h6>UI Path</h6>
                  <div class="cds--resource-card__icon--action"><svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Open resource" width="20" height="20" viewBox="0 0 20 20" role="img"><path d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path></svg></div>

                  </ClickableTile>

                  </Column>
                </Grid>
              </TabPanel>
              <TabPanel>
                <Grid className="tabs-group-content">
                  <Column
                    lg={16}
                    md={8}
                    sm={4}
                    className="landing-page__tab-content"
                  >
                    Rapidly build beautiful and accessible experiences. The
                    Carbon kit contains all resources you need to get started.
                  </Column>
                </Grid>
              </TabPanel>
              <TabPanel>
                <Grid className="tabs-group-content">
                  <Column
                    lg={16}
                    md={8}
                    sm={4}
                    className="landing-page__tab-content"
                  >
                    Carbon provides styles and components in Vanilla, React,
                    Angular, and Vue for anyone building on the web.
                  </Column>
                </Grid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Column>

      </Grid>
    </>
  );
};
