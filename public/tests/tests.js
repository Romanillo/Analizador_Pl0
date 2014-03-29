var assert = chai.assert; 

suite( 'Analizador sintáctico con PEGJS', function(){
  
  test('Suma: ', function(){
    object = pl0.parse("S = 2 + 3 .")
    assert.equal(object.block.st.right.type, "+")
  });
  
  test('Resta', function(){  
    var result = pl0.parse("R = 3 - 2 - 1.");
    assert.deepEqual(JSON.stringify(result,undefined,2), '{\n  "type": "PROGRAM",\n  "bloque": [\n    [],\n    {\n      "type": "=",\n      "left": {\n        "type": "ID",\n        "value": "R"\n      },\n      "right": {\n        "type": "-",\n        "left": {\n          "type": "-",\n          "left": {\n            "type": "NUM",\n            "value": 3\n          },\n          "right": {\n            "type": "NUM",\n            "value": 2\n          }\n        },\n        "right": {\n          "type": "NUM",\n          "value": 1\n        }\n      }\n    }\n  ]\n}');
  });
  
  test('Multiplicacion: ', function(){
    object = pl0.parse("M = 2 * 1 .")
    assert.equal(object.block.st.right.type, "*") 
  });
  
  test('Division', function(){  
    var result = pl0.parse("D = 20 / 5 / 2.");
    assert.deepEqual(JSON.stringify(result,undefined,2), '{\n  "type": "PROGRAM",\n  "bloque": [\n    [],\n    {\n      "type": "=",\n      "left": {\n        "type": "ID",\n        "value": "D"\n      },\n      "right": {\n        "type": "/",\n        "left": {\n          "type": "/",\n          "left": {\n            "type": "NUM",\n            "value": 20\n          },\n          "right": {\n            "type": "NUM",\n            "value": 5\n          }\n        },\n        "right": {\n          "type": "NUM",\n          "value": 2\n        }\n      }\n    }\n  ]\n}');
  });
  
  test('Comparacion: ', function(){
    object = pl0.parse("if e == 5 then d = 20 + e.")
    assert.equal(object.block.st.condition.type, "==")
  });
  
  test('Condicion', function(){  
    var result = pl0.parse("if a == b then j = a else j = b.");
    assert.deepEqual(JSON.stringify(result,undefined,2), '{\n  "type": "PROGRAM",\n  "bloque": [\n    [],\n    {\n      "type": "IFELSE",\n      "c": {\n        "type": "==",\n        "left": {\n          "type": "ID",\n          "value": "a"\n        },\n        "right": {\n          "type": "ID",\n          "value": "b"\n        }\n      },\n      "st": {\n        "type": "=",\n        "left": {\n          "type": "ID",\n          "value": "j"\n        },\n        "right": {\n          "type": "ID",\n          "value": "a"\n        }\n      },\n      "sf": {\n        "type": "=",\n        "left": {\n          "type": "ID",\n          "value": "j"\n        },\n        "right": {\n          "type": "ID",\n          "value": "b"\n        }\n      }\n    }\n  ]\n}');
  });
  
  test('Bucle While: ', function(){
    object = pl0.parse("while x == 3 do z = z+3.")
    assert.equal(object.block.st.type, "IF")
  });
  
  test('Error de Sintaxis: ', function(){
    assert.throws(function() { pl0.parse("B = 54"); }, /Expected "."/);
  });
  
});