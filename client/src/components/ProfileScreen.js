import React from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import Loadable from "react-loadable";
import PropTypes from "prop-types";
import * as path from "lodash.get";
import ProfileHeader from "./ProfileHeader";
import ProfileNavbar from "./ProfileNavbar";
import LoadingSpinner from "./LoadingSpinner";
import Log from "./Log";
import autosize from "autosize";

const ProfileInfo = Loadable({
  loader: () => import("./ProfileInfo"),
  loading: () => <div />,
});
const ProfileChildren = Loadable({
  loader: () => import("./ProfileChildren"),
  loading: () => <div />,
});

const getMyChildren = (userId) => {
  return axios
    .get(`/api/users/${userId}/children`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      Log.error(error);
      return [];
    });
};
const getMyProfile = (userId) => {
  return axios
    .get(`/api/users/${userId}/profile`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      Log.error(error);
      return {
        given_name: "",
        family_name: "",
        image: { path: "/images/profiles/user_default_photo.png" },
        address: { street: "", number: "" },
        email: "",
        phone: "",
        phone_type: "",
        visible: false,
        user_id: "",
      };
    });
};

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    const userId = JSON.parse(localStorage.getItem("user")).id;
    this.state = {
      profile: {},
      children: [],
      ris: null,
      myProfile: null,
      profileId: null,
      userId,
      fetchedProfile: false,
      description: "",
      rev: null,
    };
  }

  handleDelete = (index) => {
    console.log(index);
    const { userId, profileId } = this.state;
    axios
      .delete(`/api/users/${profileId}/reviews/${userId}/${index}`)
      .then((response) => {
        Log.info(response);
        window.location.reload();
      })
      .catch((error) => {
        Log.error(error);
      });
  };

  handleRev(value) {
    this.setState({ rev: value });
  }

  handleRevSend = () => {
    const { description, rev, userId, profileId } = this.state;
    axios
      .post(`/api/users/${profileId}/reviews`, {
        description,
        rev,
        userId,
      })
      .then((response) => {
        Log.info(response);
        window.location.reload();
      })
      .catch((error) => {
        Log.error(error);
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  async getRev(profileId) {
    return axios
      .get(`/api/users/${profileId}/reviews`)
      .then((response) => {
        this.setState({
          ris: response.data,
        });
      })
      .catch((error) => {
        Log.error(error);
      });
  }

  async componentDidMount() {
    const { match } = this.props;
    const { profileId } = match.params;
    await this.getRev(profileId);
    const profile = await getMyProfile(profileId);
    const myProfile = this.state.userId === profileId;

    const children = await getMyChildren(profileId);
    this.setState({
      fetchedProfile: true,
      children,
      profile,
      profileId,
      myProfile,
    });
  }

  render() {
    const { match } = this.props;
    const { profileId } = match.params;
    const { fetchedProfile, children, ris, userId, myProfile, description } =
      this.state;
    const currentPath = match.url;
    const { profile } = this.state;
    return fetchedProfile ? (
      <React.Fragment>
        <ProfileHeader
          name={`${profile.given_name} ${profile.family_name}`}
          photo={path(profile, ["image", "path"])}
        />
        <React.Fragment>
          <ProfileNavbar />
          <Switch>
            <Route
              exact
              path={`${currentPath}/info`}
              render={(props) => <ProfileInfo {...props} profile={profile} />}
            />
            <Route
              exact
              path={`${currentPath}/children`}
              render={(props) => (
                <ProfileChildren
                  {...props}
                  profileId={profileId}
                  usersChildren={children}
                />
              )}
            />
            <Route
              exact
              path={`${currentPath}/review`}
              render={(props) => (
                <React.Fragment>
                  {myProfile ? (
                    <div />
                  ) : (
                    <div
                      style={{
                        margin: "10px",
                        padding: "10px",
                        borderStyle: "groove",
                      }}
                    >
                      <h1 style={{ textAlign: "center", marginTop: "1rem" }}>
                        Inserisci una recensione:
                      </h1>
                      <textarea
                        rows="1"
                        name="description"
                        className="textareaInput form-control"
                        value={description}
                        onChange={(event) => {
                          this.handleChange(event);
                          autosize(document.querySelectorAll("textarea"));
                        }}
                        required
                      />
                      <div className="ratings-container">
                        <div className="rating">
                          <img
                            alt="sad"
                            src="/images/emoji/sad.png"
                            style={{ width: "100%" }}
                            onClick={(event) => {
                              this.handleRev(0);
                            }}
                          />
                        </div>
                        <div className="rating">
                          <img
                            alt="smile"
                            src="/images/emoji/smile.png"
                            style={{ width: "100%" }}
                            onClick={(event) => {
                              this.handleRev(1);
                            }}
                          />
                        </div>
                      </div>
                      <button
                        className="joinGroupButton"
                        onClick={this.handleRevSend}
                        style={{
                          marginTop: "0",
                          marginLeft: "0",
                          backgroundColor: "#00838f",
                          width: "100%",
                        }}
                      >
                        Invia
                      </button>
                    </div>
                  )}
                  {ris ? (
                    ris.reviews.map((key, index) => (
                      <div className="card h-100 card-review">
                        <div className="card-header pb-2 d-flex flex-row justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <img
                              alt="placeholder"
                              className="rounded-circle me-2"
                              src="https://via.placeholder.com/256/fe669e/fff.png"
                            />
                            <div className="d-flex flex-column justify-content-center align-items-start fs-5 lh-sm">
                              <b
                                className="text-primary"
                                style={{ paddingLeft: "1rem" }}
                              >
                                {key.name}
                              </b>
                            </div>
                          </div>
                          <span className="fs-1 my-0 fw-bolder text-success">
                            {key.rate === 0 ? (
                              <img
                                alt="sad"
                                src="/images/emoji/sad.png"
                                style={{ width: "100%" }}
                              />
                            ) : (
                              <img
                                alt="smile"
                                src="/images/emoji/smile.png"
                                style={{ width: "100%" }}
                              />
                            )}
                          </span>
                        </div>
                        <div className="card-body py-2">
                          <p className="card-text">{key.text}</p>
                        </div>
                        {userId === key.from ? (
                          <button
                            onClick={(event) => {
                              this.handleDelete(index);
                            }}
                            className="joinGroupButton"
                            style={{
                              marginTop: "0",
                              marginLeft: "0",
                              backgroundColor: "#ff4747",
                            }}
                          >
                            delete
                          </button>
                        ) : (
                          <div />
                        )}
                      </div>
                    ))
                  ) : (
                    <h1>Nessuna recensione presente.</h1>
                  )}
                </React.Fragment>
              )}
            />
          </Switch>
        </React.Fragment>
      </React.Fragment>
    ) : (
      <LoadingSpinner />
    );
  }
}

ProfileScreen.propTypes = {
  match: PropTypes.object,
};

export default ProfileScreen;
