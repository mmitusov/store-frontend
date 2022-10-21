//Этот компонент используется в Admin.js, для добавления новых типов товаров на БД 
//Компонент значительно отличается от CreateType.js и CreateBrand.js, однако мы используем такую же основу бутстраповского компонента - Vertically centered, просто перерабатываем его
//Копируем из react-bootstrap (раздел Modal) компонент под названием Vertically centered и импортируем его зависимости import { Button, Modal }
//Удаляем все стили/настройки из тега <Modal> и все вложеные теги из <Modal.Body>
//Далее передаем в компонент 2 пропса: show - отвечает виден компонент или нет (принимает true/false); onHide - функция которая скрывает модальное окно
//show и onHide - это бутстраповские елементы, мы их не создаем где-то отдельно, а просто используем из коробки
//И опрокидываем оба пропса в корень модального окна, в тег <Modal>
//Внутрь тела модального окна добавим форму <Form>, а в саму форму добавляем уже инпут <Form.Control />
//И добавим еще одну кнопку. Одна - для добавления нового типа товара, другая - для закрытия модального окна

import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const CreateDevice = ({show, onHide}) => {
  return (
    <Modal
    show={show}
    onHide={onHide}   
    size="lg"    
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Добавить новый бренд товара
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Control 
          placeholder={'Введите название бренда'}
        />
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant='outline-success' onClick={onHide}>Добавить бренд</Button>
      <Button variant='outline-danger' onClick={onHide}>Закрыть окно</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default CreateDevice