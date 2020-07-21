const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const TransactionModel = require('../models/TransactionModel');
const { extractMonthAndYear, validateYear, validateMonth } = require('../utils/generalValidators')

const formatYearMonth = (year, month) => {
  return `${year}-0${month}`
}

const create = async (req, res) => {
  try {
    const { description, type, day, year, month, category, value, yearMonthDay } = req.body
    const yearMonth = formatYearMonth(year, month)
    const transaction = await new TransactionModel({ description, yearMonth, type, day, month, year, category, value, yearMonthDay })
      .save();

    if (!transaction) return res.status(400).json({ message: 'The request made has errors please checkout the body of your request' })
    return res.json({ message: 'Transaction create sucessfully', data: transaction });
  } catch ({ message }) {
    return res.status(500).json({ message })
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) return res.status(400).json({ error: 'id não informado', message: "por favor informar o id via url" })
    const { description, type, day, year, month, category, value, yearMonthDay } = req.body
    const yearMonth = formatYearMonth(year, month)

    const updatedTransaction = await TransactionModel.findByIdAndUpdate({ _id: id }, {
      description, type, day, year, month, category, value, yearMonthDay, yearMonth
    }, { new: true })

    if (!updatedTransaction)
      return res.status(400).json({ error: 'id não encontrado', message: "por favor informar um id valido" })
    return res.json({ message: `a transação com o ${id} foi atualizado com sucesso`, data: updatedTransaction })
  } catch ({ message }) {
    return res.status(500).json({ message })
  }
}

const index = async (req, res) => {
  try {
    const { period } = req.query

    if (!period)
      return res.status(400).json({ error: "Por favor adicionar um parametro de busca chamado 'period' para retorna todas as transações desse periodo. O formato deve está yyyy-mm" })
    const { year, month } = extractMonthAndYear(period)
    if (!validateMonth(month))
      return res.status(400).json({ error: `O mês ${month} não é um mês valido! os messes validos vão do 01 até 12.` })

    if (!validateYear(year))
      return res.status(400).json({ error: `O ano ${year} não é um ano valido! os anos validos vão do 2019 até 2021.` })
    const allTransaction = await TransactionModel.find({ 'yearMonth': period })

    return res.json({ message: `todas as transações encontras com esse periodo:${period}`, size: allTransaction.length, data: allTransaction })
  } catch ({ message }) {
    return res.status(500).json({ message })
  }
}


const remove = async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)
    const deletedTransaction = await TransactionModel.remove({ _id: id })
    console.log(deletedTransaction)
    if (deletedTransaction.deletedCount === 0) return res.status(404).json({ error: `id ${id} não encontrado!` })

    return res.json({ message: `A transação com o id ${id} foi deletado com sucesso` })
  }

  catch ({ message }) {
    return res.status(500).json({ message })
  }
}

module.exports = {
  create,
  update,
  index,
  remove
}