import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import withLanguage from "./LanguageContext";
import Texts from "../Constants/Texts";
import GroupList from "./GroupList";
import AutoComplete from "./AutoComplete";
import Log from "./Log";

class SearchGroupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      searchedForInput: false,
      matchingGroups: [],
      categories: [],
      category: "All",
      groups: [],
      fetchedGroups: false,
      searchBarIsVisible: false,
    };
  }

  getCat() {
    const { language } = this.props;
    axios
      .get("/api/groups/cat", { params: { language: language } })
      .then((response) => {
        var ris = response.data;
        this.setState({ categories: ris[0].cat });
      })
      .catch((error) => {
        Log.error(error);
      });
  }

  componentDidMount() {
    this.getCat();
    axios
      .get("/api/groups?searchBy=visibility&visible=true")
      .then((res) => {
        const groups = res.data;
        this.setState({ fetchedGroups: true, groups });
        this.handleSearch("");
      })
      .catch((error) => {
        Log.error(error);
        this.setState({ fetchedGroups: true });
      });
  }

  handleChange = async (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state);
    if (value === "All") {
      this.handleSearch("");
    } else {
      var index = this.state.categories.indexOf(value, 0);
      const { groups } = this.state;
      const matchingGroups = [];
      groups.forEach((group) => {
        if (group.category === index) {
          matchingGroups.push(group.group_id);
        }
      });
      this.setState({
        searchedForInput: false,
        matchingGroups,
      });
      setTimeout(() => {
        this.setState({
          searchedForInput: true,
        });
      }, 1000);
    }
  };

  handleKeyPress = (e) => {
    const { searchInput } = this.state;
    if (e.key === "Enter") {
      this.handleSearch(searchInput);
    }
  };

  handleSearch = (val) => {
    const value = val.toLowerCase().trim();
    const { groups } = this.state;
    const matchingGroups = [];
    groups.forEach((group) => {
      if (group.name.toLowerCase().includes(value)) {
        matchingGroups.push(group.group_id);
      }
    });
    this.setState({
      searchedForInput: true,
      searchInput: value,
      matchingGroups,
    });
  };

  onInputChange = (event) => {
    this.setState({ searchInput: event.target.value, searchedForInput: false });
    if (event.target.value === "") this.handleSearch("");
  };

  handleSearchVisibility = async () => {
    const { searchBarIsVisible } = this.state;
    await this.setState({ searchBarIsVisible: !searchBarIsVisible });
    document.getElementById("searchGroupInput").focus();
  };

  render() {
    const { language, history } = this.props;
    const {
      fetchedGroups,
      searchBarIsVisible,
      searchInput,
      searchedForInput,
      groups,
      category,
      matchingGroups,
    } = this.state;
    const texts = Texts[language].searchGroupModal;
    return (
      fetchedGroups && (
        <React.Fragment>
          <div className="row no-gutters" id="searchGroupBarContainer">
            <div className="col-2-10">
              <button
                type="button"
                className="transparentButton center"
                onClick={() => history.replace("/myfamiliesshare")}
              >
                <i className="fas fa-arrow-left" />
              </button>
            </div>
            <div
              className="col-7-10 "
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type="search"
                id="searchGroupInput"
                value={searchInput}
                placeholder={texts.example}
                onChange={this.onInputChange}
                onKeyPress={this.handleKeyPress}
                style={searchBarIsVisible ? {} : { display: "none" }}
              />
              <h1 style={searchBarIsVisible ? { display: "none" } : {}}>
                {texts.search}
              </h1>
            </div>
            <div className="col-1-10">
              <button
                type="button"
                className="transparentButton center"
                onClick={this.handleSearchVisibility}
              >
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
          {!searchedForInput ? (
            <div id="searchGroupSuggestionsContainer">
              <AutoComplete
                searchInput={searchInput}
                entities={groups}
                handleSearch={this.handleSearch}
              />
            </div>
          ) : (
            <div>
              <div
                style={{ marginTop: "0" }}
                className="row no-gutters"
                id="searchGroupResultsContainer"
              >
                <h1>{texts.results}</h1>
              </div>
              <div class="select-dropdown">
                <select
                  name="category"
                  value={category}
                  onChange={this.handleChange}
                  required
                >
                  <option value="All">All</option>
                  {this.state.categories.map((x) => (
                    <option value={x}>{x}</option>
                  ))}
                </select>
              </div>
              <GroupList groupIds={matchingGroups} />
            </div>
          )}
        </React.Fragment>
      )
    );
  }
}

SearchGroupScreen.propTypes = {
  language: PropTypes.string,
  history: PropTypes.object,
};

export default withLanguage(SearchGroupScreen);
