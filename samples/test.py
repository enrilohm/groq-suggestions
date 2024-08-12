def get_iris_data():
    from sklearn.datasets import load_iris
    iris = load_iris()
    return iris.data, iris.target


data= get_iris_data()


def create_and_evaluate_tensorfflow_nn(data):
    import tensorflow as tf
    from sklearn.model_selection import train_test_split

    X, y = data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = tf.keras.models.Sequential([
        tf.keras.layers.Dense(100, activation='relu', input_shape=(4,)),
        tf.keras.layers.Dense(100, activation='relu'),
        tf.keras.layers.Dense(3, activation='softmax')
    ])

    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

    model.fit(X_train, y_train, epochs=50, batch_size=128, verbose=2)

    model.evaluate(X_test, y_test)


create_and_evaluate_tensorfflow_nn(data)

def create_and_evaluate_support_vector_machine_model(data):
    from sklearn.svm import SVC
    from sklearn.model_selection import train_test_split
    from sklearn.metrics import accuracy_score

    X, y = data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    svm_model = SVC(kernel='linear', C=1)
    svm_model.fit(X_train, y_train)

    y_pred = svm_model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)

    return accuracy

create_and_evaluate_support_vector_machine_model(data)


import pandas as pd
#create sample dataframe with name, city, age. There should be multiple persons from the same city

data = {
    "name": ["John", "Anna", "Peter", "Linda", "John", "Anna", "Peter", "Linda"],
    "city": ["NYC", "NYC", "LA", "LA", "NYC", "NYC", "LA", "LA"],
    "age": [28, 24, 35, 32, 28, 24, 35, 32]
}
df = pd.DataFrame(data)

df
from typing import Dict
def aggregate(df:pd.DataFrame)->Dict[str,int]:
    """return the maximum age grouped by city"""

import pandas as pd

def aggregate(df:pd.DataFrame)->Dict[str,int]:
    """return the maximum age grouped by city"""
    result = df.groupby('city')['age'].max().to_dict()
    return result
