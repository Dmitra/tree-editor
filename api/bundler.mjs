import fs from 'fs'
import _ from 'lodash'

const filenames = fs.readdirSync('public/data/')
const bundle = {}

_.each(filenames, dir => {
  if (dir === 'bundle.json') return
  const itemsFile = fs.readdirSync(`public/data/${dir}/item`)
  _.each(itemsFile, fileName => {
    const text = fs.readFileSync(`public/data/${dir}/item/${fileName}`, { encoding: 'utf8', flag: 'r' })
    const json = JSON.parse(text)
    bundle[dir] = bundle[dir] || { item: {}, list: {} }
    bundle[dir].item[fileName.replace('.json', '')] = json
  })
  const listFile = fs.readdirSync(`public/data/${dir}/list`)[0]
  const listText = fs.readFileSync(`public/data/${dir}/list/${listFile}`, { encoding: 'utf8', flag: 'r' })
  const listJson = JSON.parse(listText)
  bundle[dir].list[listFile.replace('.json', '')] = listJson
})

fs.writeFileSync('public/data/bundle.json', JSON.stringify(bundle))