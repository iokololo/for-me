import React, { useState } from "react";

const dashboard = (props) => {
  function cyrillicToLatin(text) {
    const cyrillicToLatinMap = {
      а: "a",
      б: "b",
      в: "v",
      г: "g",
      д: "d",
      е: "e",
      ё: "yo",
      ж: "zh",
      з: "z",
      и: "i",
      й: "y",
      к: "k",
      л: "l",
      м: "m",
      н: "n",
      о: "o",
      п: "p",
      р: "r",
      с: "s",
      т: "t",
      у: "u",
      ф: "f",
      х: "kh",
      ц: "ts",
      ч: "ch",
      ш: "sh",
      щ: "shch",
      ъ: "",
      ы: "y",
      ь: "",
      э: "e",
      ю: "yu",
      я: "ya",
      А: "A",
      Б: "B",
      В: "V",
      Г: "G",
      Д: "D",
      Е: "E",
      Ё: "Yo",
      Ж: "Zh",
      З: "Z",
      И: "I",
      Й: "Y",
      К: "K",
      Л: "L",
      М: "M",
      Н: "N",
      О: "O",
      П: "P",
      Р: "R",
      С: "S",
      Т: "T",
      У: "U",
      Ф: "F",
      Х: "Kh",
      Ц: "Ts",
      Ч: "Ch",
      Ш: "Sh",
      Щ: "Shch",
      Ъ: "",
      Ы: "Y",
      Ь: "",
      Э: "E",
      Ю: "Yu",
      Я: "Ya",
    };

    // Convert the text character by character
    let latinText = "";
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const latinChar = cyrillicToLatinMap[char];
      // If the character is not found in the map, keep it unchanged
      latinText += latinChar ? latinChar : char;
    }

    return latinText;
  }

  const [addedImages, setAddedImages] = useState([]);
  const handleFiles = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(
        "images",
        files[i],
        cyrillicToLatin(files[i].name).replace(/\s/g, "")
      );
    }
    const res = await fetch("/property/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setAddedImages(data);
  };

  return (
    <div style={styles.root}>
      <label htmlFor='input' style={styles.label}>
        Загрузите файлы
      </label>
      <input
        type='file'
        multiple={true}
        id='input'
        style={styles.input}
        onChange={handleFiles}
      />
      <div style={styles.result}>
        {addedImages?.map((i) => (
          <div style={styles.item}>
            <div>{i.split("/")[1]}</div>
            <div>
              <img src={i} key={i} alt='image' style={styles.image} />
            </div>
          </div>
        ))}
      </div>
      <label
        onClick={() => {
          fetch("/payment/download", {
            method: "GET",
          }).then((res) => {
            res.blob().then((blob) => {
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "statistic.pdf";
              a.click();
            });
          });
        }}
        style={styles.label}
      >
        Скачать статистику
      </label>
    </div>
  );
};

const styles = {
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  result: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "column",
  },
  input: {
    display: "none",
  },
  label: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 70,
    border: "1px solid #4E77FB",
    backgroundColor: "#4E77FB",
    borderRadius: 5,
    color: "#fff",
    cursor: "pointer",
    marginTop: 20,
  },
};

export default dashboard;
