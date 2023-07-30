const bookModle= require('../Moudels/book.schema')

exports.addOneBook = async (req, res) => {
  try {
    console.log(req.user.role);
    if (req.user.role === "Admin") {
      await bookModle.create(req.body)
      return res.json({ message: "added", data: [] })
    }
    else {
      return res.status(403).send("You Dont Have Permssion")
    }
  } catch (error) {
    console.log(error)
    return res.status(400).send({ message: error })
  }
}

exports.getAllBooks = async (req, res) => {
  try {
    let books = await bookModle.find()
    return res.json({ message: "done", data: books })
  } catch (error) {
    console.log(error)
    return res.status(400).send({ message: error })
  }
}

exports.getOneBook = async (req, res) => {
  try {
    let book = await bookModle.find({ _id: req.params.id })
    return res.json({ message: "done", data: book })
  } catch (error) {
    console.log(error)
    return res.status(400).send({ message: error })
  }
}

exports.updateOneBook = async (req, res) => {
  try {
    console.log(req.user.role);
    if (req.user.role === "Admin") {
      await bookModle.findOneAndUpdate({ _id: req.params.id }, req.body)
      return res.json({ message: "updated", data: [] })
    }
    else {
      return res.status(403).send("You Dont Have Permssion")
    }
  } catch (error) {
    console.log(error)
    return res.status(400).send({ message: error })
  }
}

exports.deleteOneBook = async (req, res) => {
  try {
    if (req.user.role === "Admin") {
      try {
        const Books = await bookModle.findByIdAndDelete({ _id: req.params.id })
        if (Books.length === 0) {
          return res.json({ message: "Book Not Found", data: [] })

        }
        else {
          return res.json({ message: "deleted", data: [] })
        }

      } catch (error) {
        return res.json({ message: "Book Not Found", data: [] })

      }

    }
    else {
      return res.status(403).send("You Dont Have Permssion")
    }
  } catch (error) {
    console.log(error)
    return res.status(400).send({ message: error })
  }
}

exports.getAllBooksByAutor = async (req, res) => {
  try {
    const books = await bookModle.find({ autor: req.params.autor })
    if (books.length === 0) {
      return res.status(400).send({ message: "author not found" })
    }
    else {
      return res.status(200).send({ message: "done", data: books })

    }
  } catch (error) {
    return res.status(400).send({ message: error })
  }
}