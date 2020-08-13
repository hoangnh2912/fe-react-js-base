import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
const N = " ",
  X = "X",
  O = "O";
export default (props) => {
  const initBoard = [
    [N, N, N],
    [N, N, N],
    [N, N, N],
  ];
  const [board, setBoard] = useState(initBoard);

  const [turn, setTurn] = useState(X);

  const clearBoard = () => {
    setBoard(initBoard);
    setTurn(X);
  };

  const setPlay = (x, y) => {
    if (board[x][y] !== N) return;
    board[x][y] = turn;
    setBoard(board);
    if (isWin(x, y)) {
      alert(board[x][y] + " win");
      clearBoard();
      return;
    }
    setTurn(turn === X ? O : X);
  };

  const isWin = (x, y) => {
    const s = board[x][y];
    const n = 3;
    for (let i = 0; i < n; i++) {
      if (board[x][i] != s) break;
      if (i == n - 1) {
        return true;
      }
    }
    //check row
    for (let i = 0; i < n; i++) {
      if (board[i][y] != s) break;
      if (i == n - 1) {
        return true;
      }
    }
    //check diag
    if (x == y) {
      //we're on a diagonal
      for (let i = 0; i < n; i++) {
        if (board[i][i] != s) break;
        if (i == n - 1) {
          return true;
        }
      }
    }
    //check anti diag (thanks rampion)
    if (x + y == n - 1) {
      for (let i = 0; i < n; i++) {
        if (board[i][n - 1 - i] != s) break;
        if (i == n - 1) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          padding: 30,
          borderRadius: 15,
        }}
        onPress={clearBoard}
        children={<Text style={{ fontSize: 60 }} children={"Turn: " + turn} />}
      />
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "center",
          padding: 30,
          borderRadius: 15,
        }}
        onPress={clearBoard}
        children={<Text style={{ fontSize: 60 }} children="Clear" />}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
        children={board.map((elem, x) => (
          <View
            style={{ flexDirection: "row" }}
            children={elem.map((val, y) => (
              <TouchableOpacity
                onPress={() => setPlay(x, y)}
                style={{
                  width: 100,
                  height: 100,
                  borderWidth: 1,
                  justifyContent: "center",
                }}
                children={
                  <Text
                    style={{ fontSize: 50, alignSelf: "center" }}
                    children={val}
                  />
                }
              />
            ))}
          />
        ))}
      />
    </>
  );
};
