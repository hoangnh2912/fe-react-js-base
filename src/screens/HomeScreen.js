import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const NONE = " ",
  X = "X",
  O = "O",
  SIZE = 5;

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.genInitBoard(SIZE),
      turn: X,
    };
  }

  onPlay = (x, y) => {
    var { board, turn } = this.state;
    if (board[x][y] != NONE) return;
    board[x][y] = turn;
    this.setState(
      {
        board,
        turn: turn == X ? O : X,
      },
      () => {
        if (this.isWin(x, y)) {
          const val = JSON.stringify(board[x][y]);
          setTimeout(() => {
            alert(val + "win");
            this.reset();
          }, 100);
        }
      }
    );
  };

  isWin = (x, y) => {
    const { board } = this.state;
    const n = board.length > 4 ? 4 : board.length;
    const s = board[x][y];
    for (var i = 0; i < n; i++) {
      if (board[x][i] != s) break;
      if (i == n - 1) return true;
    }
    //check row
    for (var i = 0; i < n; i++) {
      if (board[i][y] != s) break;
      if (i == n - 1) return true;
    }
    //check diag
    if (x == y) {
      //we're on a diagonal
      for (var i = 0; i < n; i++) {
        if (board[i][i] != s) break;
        if (i == n - 1) return true;
      }
    }
    //check anti diag (thanks rampion)
    if (x + y == n - 1) {
      for (var i = 0; i < n; i++) {
        if (board[i][n - 1 - i] != s) break;
        if (i == n - 1) return true;
      }
    }
    return false;
  };

  genInitBoard = (size = 3) => {
    return Array.from(Array(size).keys()).map((elem) =>
      Array.from(Array(size).keys()).map((val) => NONE)
    );
  };

  reset = () => {
    this.setState({
      board: this.genInitBoard(SIZE),
      turn: X,
    });
  };

  render() {
    return (
      <View style={{ alignSelf: "center", flex: 1 }}>
        <Text
          style={{ fontSize: 30, alignSelf: "center" }}
          children={"Turn: " + this.state.turn}
        />
        <TouchableOpacity
          onPress={this.reset}
          children={
            <Text
              style={{ fontSize: 30, alignSelf: "center" }}
              children={"Reset"}
            />
          }
        />
        {this.state.board.map((elem, x) => (
          <View
            style={{ flexDirection: "row", alignSelf: "center" }}
            children={elem.map((val, y) => (
              <TouchableOpacity
                onPress={() => this.onPlay(x, y)}
                style={{
                  borderWidth: 1,
                  borderRadius: 3,
                  padding: 30,
                  width: 100,
                  height: 100,
                }}
                children={
                  <Text
                    style={{ fontSize: 30, alignSelf: "center" }}
                    children={val}
                  />
                }
              />
            ))}
          />
        ))}
      </View>
    );
  }
}
