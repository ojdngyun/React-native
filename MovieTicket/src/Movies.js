import React, { Component } from 'react';
import moment from 'moment';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
// import { movies } from './data';
import MoviePoster from './MoviePoster';
import MoviePopup from './MoviePopup';

@connect(
  state => ({
    movies: state.movies,
    loading: state.loading,
  }),
  dispatch => ({
    refresh: () => dispatch({type: 'GET_MOVIE_DATA'}),
  }),
)

export default class Movies extends Component {
  state = {
    popupIsOpen: false,
    // day chosen by user
    chosenDay: 0, // choose first day by default
    // time chosen by user
    chosenTime: -1,
  }

  // open movie popup
  openMoviePopup = (movie) => {
    this.setState({
      popupIsOpen: true,
      movie,
    });
  }

  // close movie popup
  closeMoviePopup = () => {
    this.setState({
      popupIsOpen: false,
      // reset values to default
      chosenDay: 0,
      chosenTime: -1,
    });
  }

  chooseDay = (day) => {
    this.setState({
      chosenDay: day,
    });
  }

  chooseTime = (time) => {
    this.setState({
      chosenTime: time,
    });
  }

  bookTicket = () => {
    // make sure they selected time
    if (this.state.chosenTime < 0) {
      alert('Please select show time');
    } else {
      // close group
      this.closeMoviePopup();
      // navigate away to confirmation route
      this.props.navigator.push({
        name: 'confirmation',
        // generate random string
        code: moment().format('HHkkmmssSSS').toString('base64').substring(6).toUpperCase(),
      });
    }
  }

  render() {
    const { movies, loading, refresh } = this.props;
    return (
      <View style={styles.container}>
        {movies
        ? <ScrollView
          contentContainerStyle={styles.scrollContent}
          // hide all scroll indicators
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refresh}/>
          }>
            {movies.map((movie, index) => <MoviePoster
              movie={movie}
              onOpen={this.openMoviePopup}
              key={index}/>)}
          </ScrollView>
        : <ActivityIndicator
            animating={loading}
            style={styles.loader}
            size="large"/> }
          <MoviePopup
            movie={this.state.movie}
            isOpen={this.state.popupIsOpen}
            onClose={this.closeMoviePopup}
            chosenDay={this.state.chosenDay}
            chosenTime={this.state.chosenTime}
            onChooseDay={this.chooseDay}
            onChooseTime={this.chooseTime}
            onBook={this.bookTicket}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,         // start below status bar
  },
  loader: {
    flex: 1,
    alignItems: 'center',   // center horizontally
    justifyContent: 'center', // center vertically
  },
  scrollContent: {
    flexDirection: 'row',   // arrange posters in rows
    flexWrap: 'wrap',       // allow multiple rows
  },
});
