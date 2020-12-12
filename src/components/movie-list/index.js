import React, { Component }  from "react"
import "./index.css"
import axios from 'axios'

class MovieList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchValue: '',
      result: null,
      searched: false,
      loading: false
    }

    this.setSearch = this.setSearch.bind(this)
    this.invokeSearch = this.invokeSearch.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }

  setSearch = (val) => {
    this.setState({ searchValue: val })
  }

  invokeSearch = async (input) => {
    this.isLoading(true)
    this.setState({ result: null })

    try {
      let searchField = input.toLowerCase().split(' ').join('+')
      console.log(searchField)

      await axios.get(`/getreviews?movie=${searchField}`).then(res => {
        if(!res) throw "ERROR";
      
        let result = res.data;
        let percent = 0

        result.good = []
        result.bad = []
        for (let i = 0; i < result.reviews.length; i++) {
          if (result.reviews[i].prediction[0] > .85) {
            percent += 1

            result.good.push(result.reviews[i].review)
          } else if (result.reviews[i].prediction[1] > .85) {
            result.bad.push(result.reviews[i].review)
          }
        }

        result.percent = Math.round(percent / result.reviews.length * 100)

        this.setState({ result })
      })

      this.setState({ searched: true })

      this.isLoading(false)

      return true
    } catch (err) {
      this.setState({ result: null })
      this.setState({ searched: true })
      this.isLoading(false)
      console.error(err)

      return false
    }
  }

  isLoading = loading => {
    this.setState({ loading })
  }

  render() {
    return (
      <div className="layout-column align-items-center mt-50" style={{ cursor: this.state.loading ? 'wait' : 'auto' }}>
        {
          !this.state.searched &&
          (
            <div
              className=""
              style={{ color: 'black', fontSize: '3em', margin: '10px auto' }}
            >
              CSC 864: Movie Sentiment
            </div>
          )
        }

        <section
          className="layout-row align-items-center justify-content-center"
        >

          <input
            type="text" className="large" style={{ width: 350 }}
            placeholder="Enter Name of the Movie eg 'The Last Samurai'"
            data-testid="app-input" value={ this.state.searchValue }
            onChange={ e => this.setSearch(e.target.value) }
            onKeyUp={ e => e.key === 'Enter' ? this.invokeSearch(this.state.searchValue) : e.key === 'Escape' ? this.setSearch('') : '' }
          />

          <button
            className="bg-primary"
            data-testid="submit-button"
            onClick={ () => this.invokeSearch(this.state.searchValue) }
          >
            Search
          </button>
        </section>
  
        {
          (this.state.searched && this.state.result) ?
          (
            <ul className="mt-15" style={{ width: '80%' }} data-testid="movieList">
              <div className="slide-up-fade-in py-10 px-10" style={{ backgroundColor: 'white', boxShadow: '0px 0px 5px #888888', textAlign: 'center' }}>
                IMDB Rating: <hr/>
                <b style={{ fontSize: '2em' }}>{ this.state.result.imdbRating }</b>
              </div><br/>

              <div className="slide-up-fade-in py-10 px-10" style={{ backgroundColor: 'white', boxShadow: '0px 0px 5px #888888', textAlign: 'center' }}>
                User Rating: <hr/>
                <b style={{ fontSize: '2em' }}>{ this.state.result.percent }%</b>
              </div><br/>

              <div className="slide-up-fade-in py-10 px-10" style={{ backgroundColor: 'white', boxShadow: '0px 0px 5px #888888' }}>
                Top Positive Reviews: <hr/>
                <ul>
                  {
                    this.state.result.good.map((v, i) => {
                      return (<li key={ i }>{ v }</li>)
                    })
                  }
                </ul>
              </div><br/>

              <div className="slide-up-fade-in py-10 px-10" style={{ backgroundColor: 'white', boxShadow: '0px 0px 5px #888888' }}>
                Top Negative Reviews: <hr/>
                <ul>
                  {
                    this.state.result.bad.map((v, i) => {
                      return (<li key={ i }>{ v }</li>)
                    })
                  }
                </ul>
              </div>
            </ul>
          ) : this.state.searched ?
          (<div className="mt-50 slide-up-fade-in" data-testid="no-result">No Results Found</div>) : (<div className="mt-50 slide-up-fade-in" data-testid="no-result"></div>)
        }

        {
          this.state.loading && (<div className="mt-50 slide-up-fade-in" data-testid="no-result">Loading...</div>)
        }
      </div>
    )
  }
}

export default MovieList;
