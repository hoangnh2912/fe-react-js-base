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
    this.genCheck(x, y, 3);
    this.setState(
      {
        board,
        turn: turn == X ? O : X,
      },
      () => {
        // if (this.isWin(x, y)) {
        //   const val = JSON.stringify(board[x][y]);
        //   setTimeout(() => {
        //     alert(val + "win");
        //     this.reset();
        //   }, 100);
        // }
      }
    );
  };

  genCheck = (x, y, n, s = SIZE) => {
    const { board } = this.state;
    const from_y = Math.max(x - n + 1, 0),
      to_y = Math.min(x + n, s),
      from_x = Math.max(y - n + 1, 0),
      to_x = Math.min(y + n, s),
      from_diag_left = Math.min(x - from_y, y - from_x),
      to_diag_left = Math.min(to_y - x - 1, to_x - y - 1),
      from_diag_right = Math.min(x - from_y, to_x - y - 1),
      to_diag_right = Math.min(to_y - x - 1, y - from_x);

    for (let i = from_y; i < to_y; i++) {
      board[i][y] = X;
    }

    console.log(to_diag_right);

    board[x - from_diag_left][y - from_diag_left] = O;
    board[to_diag_left + x][to_diag_left + y] = O;
    board[x - from_diag_right][y + from_diag_right] = O;
    board[x - to_diag_right][0] = "N";
    for (let i = from_x; i < to_x; i++) {
      board[x][i] = X;
    }
  };

  isWin = (x, y) => {
    const { board } = this.state;
    const n = 3;
    const s = board[x][y];

    //check colum
    for (let i = 0; i < n; i++) {
      if (board[x][i] != s) break;
      if (i == n - 1) return true;
    }
    //check row
    for (let i = 0; i < n; i++) {
      if (board[i][y] != s) break;
      if (i == n - 1) return true;
    }
    //check diag
    if (x == y) {
      //we're on a diagonal
      for (let i = 0; i < n; i++) {
        if (board[i][i] != s) break;
        if (i == n - 1) return true;
      }
    }
    //check anti diag (thanks rampion)
    if (x + y == n - 1) {
      for (let i = 0; i < n; i++) {
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
