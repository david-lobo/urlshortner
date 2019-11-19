import React, {Component} from "react";
import axios from 'axios';

const API_PATH = 'http://127.0.0.1:8000/';

class AppContainer extends Component {
  render() {
    return (
          <div className="App">
            <div className="container my-5">
              <h1>Url Shortner</h1>
              { this.state.urlShortened &&
              <div className="alert alert-success my-3" role="alert">
                Here is the short url  <a target="_blank" href={'http://localhost:8000/' + this.state.shortUrl} className="alert-link">{'http://localhost:8000/' + this.state.shortUrl}</a>. Give it a click if you like.
              </div>
              }

            { this.state.error &&
            <div className="alert alert-danger my-3" role="alert">
              {this.state.error}
            </div>
            }

            <form action="/action_page.php">
            <div className="form-group">
            <label>Full Url:</label>
            <input 
              className="form-control" 
              type="text" 
              id="url" 
              name="url" 
              placeholder="Url to shorten.."
              value={this.state.url}
              onChange={e => this.setState({ url: e.target.value })} 
            />
            </div>
            <input onClick={e => this.handleFormSubmit(e)} className="btn btn-primary" type="submit" value="Submit" />
            </form>   
            </div>
          </div>
      );
    }

    constructor(props) {
        super(props);
        this.state = {
          url: '',
          urlShortened: false,
          shortUrl: '',
          error: null
        }
      }

      handleFormSubmit( event ) {
        event.preventDefault();
        this.setState({ 
          url: '',
          urlShortened: false,
          shortUrl: '',
          error: null
         });
        axios({
          method: 'post',
          url: `${API_PATH}`,
          headers: { 'content-type': 'application/json' },
          data: this.state
        })
        .then(result => {
          this.setState({
            urlShortened: typeof result.data.short_url !== 'undefined',
            shortUrl: typeof result.data.short_url !== 'undefined' ? result.data.short_url : ''
          })
        })
        .catch(error => {
          let message = error.message;
          let data = error.response.data;

          if (typeof data.errors !== 'undefined' && typeof data.errors.url !== 'undefined') {
            message = data.errors.url;
          }

          return this.setState({ error: message });
        });
      }
}

export default AppContainer;
