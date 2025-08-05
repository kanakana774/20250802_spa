package com.example.todo_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.todo_backend.domain.Todo;
import com.example.todo_backend.repository.TodoRepository;

/*
 * @CrossOrigin の役割とは？
 * ブラウザは、XSS（クロスサイトスクリプティング）やCSRF攻撃を防ぐために、
 * 「あるオリジン（スキーム＋ドメイン＋ポート）」から読み込んだJSが、
 * 別オリジンのサーバーへ勝手にアクセスすることを制限します。
 * http://localhost:5173（webサーバー）からもらったjs ⇒ http://localhost:8080（apiサーバー）へのアクセスを制限
 * 
 * JS（React）を配信するサーバーと、APIサーバーが別ドメインやポート番号であるSPA構成では、この設定が不可欠になります。
 */
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/todos")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    @GetMapping
    public List<Todo> getAll() {
        return todoRepository.findAll();
    }

    @PostMapping
    public Todo create(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }
}
