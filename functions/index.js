/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require('firebase-functions/v2/https')

const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })
const sgMail = require('@sendgrid/mail')
const fs = require('fs')
const path = require('path')

admin.initializeApp()
sgMail.setApiKey(process.env.VITE_SENDGRID_KEY)
const db = admin.firestore()
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection('books')
      const snapshot = await booksCollection.get()
      const count = snapshot.size

      res.status(200).send({ count })
    } catch (error) {
      console.error('Error counting books:', error.message)
      res.status(500).send('Error counting books')
    }
  })
})
exports.addBook = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed')
      }
      const { isbn, name } = req.body
      if (!isbn || isNaN(isbn) || !name) {
        return res.status(400).send('Invalid input data')
      }
      const uppercaseName = name.toUpperCase()
      const bookRef = await db.collection('books').add({
        isbn: isbn,
        name: uppercaseName
      })
      res.status(200).send(`Book added with ID: ${bookRef.id}`)
    } catch (error) {
      console.error('Error adding book:', error)
      res.status(500).send('Error adding book')
    }
  })
})

exports.getUsers = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const usersSnapshot = await db.collection('siteUsers').get()
      const users = []
      usersSnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() })
      })
      res.status(200).send(users)
    } catch (error) {
      console.error('Error fetching users:', error)
      res.status(500).send('Error fetching users')
    }
  })
})

// 获取志愿者数据
exports.getVolunteers = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const volunteersSnapshot = await db.collection('siteVolunteers').get()
      const volunteers = []
      volunteersSnapshot.forEach((doc) => {
        volunteers.push({ id: doc.id, ...doc.data() })
      })
      res.status(200).send(volunteers)
    } catch (error) {
      console.error('Error fetching volunteers:', error)
      res.status(500).send('Error fetching volunteers')
    }
  })
})
exports.sendEmail = onRequest((req, res) => {
  cors(req, res, async () => {
    const { name, email } = req.body
    const filePath = path.join(__dirname, 'assets/pjbg.png')
    const attachment = fs.readFileSync(filePath).toString('base64')

    const msg = {
      to: email, // Change to your recipient
      from: 'wzhang0007@gmail.com', // Change to your verified sender
      subject: 'Hello from SendGrid with Attachment',
      text: `Hello ${name}, this is a test email sent using SendGrid with an attachment!`,
      html: `<strong>Hello ${name}, this is a test email sent using SendGrid with an attachment!</strong>`,
      attachments: [
        { content: attachment, filename: 'pjbg.png', type: 'img/png', disposition: 'attachment' }
      ]
    }
    try {
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
      res.status(200).send(`Email sent to box`)
    } catch (error) {
      console.error('Error sending email:', error)
      res.status(500).send('Error sending email!!!!!', error)
    }
  })
})

// 批量发送邮件
exports.sendBulkEmails = onRequest((req, res) => {
  cors(req, res, async () => {
    const { emails } = req.body

    try {
      const messages = emails.map((user) => ({
        to: user.email,
        from: 'wzhang0007@gmail.com',
        subject: 'Hello from SendGrid',
        text: `Hello ${user.name}, this is a bulk email sent using SendGrid!`,
        html: `<strong>Hello ${user.name},` + ` this is a bulk email sent using SendGrid!</strong>`
      }))
      try {
        sgMail
          .send(messages)
          .then(() => {
            console.log('Email sent')
          })
          .catch((error) => {
            console.error(error)
          })
        res.status(200).send(`Email sent to box`)
      } catch (error) {
        console.error('Error sending email:', error)
        res.status(500).send('Error sending email!!!!!', error)
      }
      res.status(200).send('Emails sent to selected users')
    } catch (error) {
      console.error('Error sending bulk emails:', error)
      res.status(500).send('Error sending bulk emails')
    }
  })
})
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
