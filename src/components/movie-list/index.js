import React, { Component }  from "react";
import "./index.css";
import axios from 'axios'
// import imdb from 'imdb-api'

class MovieList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchValue: '',
      result: null,
      searched: false
    }

    this.setSearch = this.setSearch.bind(this)
    this.invokeSearch = this.invokeSearch.bind(this)
  }

  setSearch = (val) => {
    this.setState({ searchValue: val })
  }

  invokeSearch = async (input) => {
    try {
      if (input === 'despicable me') {
        const result = {
          description: 'A man who delights in all things wicked, supervillain Gru (Steve Carell) hatches a plan to steal the moon. Surrounded by an army of little yellow minions and his impenetrable arsenal of weapons and war machines, Gru makes ready to vanquish all who stand in his way. But nothing in his calculations and groundwork has prepared him for his greatest challenge: three adorable orphan girls (Miranda Cosgrove, Dana Gaier, Elsie Fisher) who want to make him their dad.',
          rating: '88%',
          bad: [
            `Oh Dear! This is fine you children 8 and under. However, for anyone older the plot is highly predictable, the characterisation belaboured and most of the jokes purile in the extreme. Comparisons with similar recent offerings (UP, Toy Story 3, How to Tame your Dragon) are inevitable and DM does not compare well on any measure you care to use. Might be worth buying the DVD to keep young kids occupied for 90 minutes when it's raining, but there are far better animated films out there that will entertain you better and will be worth a second or third showing.`,
            `WHAT A WASTE OF TIME, TALENT, AND MONEY!

            How in the world is this really, really lame movie getting such good reviews?
            
            1. Boring, old, and overused story line.
            
            2. Saturday morning cartoon like plot and animation.
            
            3. Really bad voice overs (come on.. can't we do a better join of reading from the script into a microphone? how about a little emotion, voice inflection, or originality?).
            
            4. Reuse of characters (the villain looks exactly like a character used in "The Incredibles" and the middle aged girl looks like the boy at the beginning of "Up").
            
            5. Compared to "Toy Story 3" and "Shrek" this summer animation is a way, way distant 3rd place (not even close).
            
            6. (and this is the worst) This movie is really just NOT all that funny. In fact, if it wasn't for the site gags by the minions the number of time the audience laughed for this movie in the theater I was in (an almost full Cinemark 3D Xtreme theater) could be counted on one hand!
            
            So.. ignore all the planted and unrealistically high reviews in here created by paid reviewers (I just love those giving a rating of 9 or 10 to this piece of junk and claiming that they are a real reviewer and not paid off), save your hard earned money, and rent it on DVD for a dollar or two when it comes out around Thanksgiving (if not sooner).
            
            I feel really ripped off by this one....`,
            `This movie had potential to be a great film. The idea of a villain taking care of three little girls, surrounded by bug-eyed minions, while trying to steal the moon, seemed like it would be worth a few laughs. Sadly, it wasn't.

            What's with all the praises?
            
            Most of the scenes were only to show of the 3D, so the overall film was bland. Any time the movie came close to conveying real emotion or care for the characters it jumped to a new scene. It was disappointing, I wanted to care about the characters, but couldn't. I was excited when they began to show Gru's back story, but all we got were snippets, nothing substantial that fully explained his relationship with his mother, his notions of parenting, or turn to villainy. His fascination with the moon was barely touched upon, and could have helped support the film. Giving Gru some ray guns, gray clothes, and thick accent does not make him a villain, unless we know why he became a villain in the first place.
            
            The movie was overall bland. The jokes fell flat. Perhaps little children who have yet to develop a sense of humor beyond burps and farts enjoyed it.
            
            The voice work of Steve Carell was great, but the random addition of Julie Andrews, who in my opinion is a great voice talent, was a pointless waste of talent, seeing as how she couldn't have had more than three lines.
            
            I will say one thing positive about this film, I really enjoyed the music.`
          ],
          good: [
            `This cartoon once again proves that you are not afraid to tell old stories, you only need to have an old heart. What touches people is the little fun inside, the little cuteness, the little loneliness, and everyone under the hard exterior desires a warm heart. It's really far better than toy3.`,
            `I got early screening passes to go see this with my family tonight, and went well out of our way to go see it. I must say it was absolutely worth it. Funniest movie I have seen in a long time. It's great for kids and adults it has such a great humor that everyone laughed. The whole theater was laughing for an hour and half! Definitely see it in 3D though. And normally I don't care for 3D, cause it's kinda blurry and weird, but this movie's 3D effects were really well done!Oh and remember to stay and watch the credits, the Minions do some really cool stuff, where they come out of the screen. WELL WORTH YOUR MONEY! Going on my list of favorite movies. ^.^`,
            `I was fortunate to get free tickets to see this movie in 3d over the weekend. I only went because it was free, I really was not excited, but it ended up surprising me and I really enjoyed it. The people I saw the movie with were from ages 6 to 31, male and female, and we ALL thought the movie was great!!

            There was a lot of lol moments, the theatre was packed, and everyone in the audience seemed to enjoy themselves. The story was cute and enjoyable for children as well as adults. It had a good message too, which makes it worth your time to go see. I loved watching this film in 3d! I think the movie would be good without 3d, but if you are going to spend the money to watch it, spend the 3 extra dollars and see it in 3d. It was worth it.
            
            This film is AWESOME and I would recommend it to everyone!!!`
          ]
        }

        this.setState({ result })
      } else {
        this.setState({ result: null })
      }
      // await axios.get(`https://jsonmock.hackerrank.com/api/movies?Year=${input}`).then(res => {
      //   const result = res.data.data;
      //   this.setState({ result })
      //   this.setState({ searched: true })
      // })
      // await imdb.get({ name: 'The Toxic Avenger' }, {
      //   apiKey: '55013436', timeout: 30000
      // }).then(res => console.log(res)).catch(err => console.log(err));

      this.setState({ searched: true })

      return true
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div className="layout-column align-items-center mt-50">
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
              <div className="slide-up-fade-in py-10 px-10" style={{ backgroundColor: 'white', boxShadow: '0px 0px 5px #888888' }}>
                Description: <hr/>
                { this.state.result.description }
              </div><br/>

              <div className="slide-up-fade-in py-10 px-10" style={{ backgroundColor: 'white', boxShadow: '0px 0px 5px #888888', textAlign: 'center' }}>
                Rating: <hr/>
                <b style={{ fontSize: '2em' }}>{ this.state.result.rating }</b>
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
      </div>
    );
  }
}

export default MovieList;
