module.exports = async function fetchSuggestions(prompt, grammar) {
  if (!grammar){
    grammar = "python"
  }
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${atom.config.get('groq-suggestions.api_key')}`
      },
      body: JSON.stringify({
          messages: [
              {
                  role: 'system',
                  content:
                      'You are an autocompletion tool for code written in '+grammar+'. Given the definition of a function, please complete function code. Remember to include linebreaks and indentation. Only provide the code completion without any explanation!. The code should be ready to execute. Make sure that all variables are defined and import necessary packages. Example: \n\ninput_text: "def calculate_logarithm(x):"\noutput_text: "\n    import math\n    result=math.log(x)\n    return result"'
              },
              {
                  role: 'user',
                  content: prompt
              }
          ],
          // model: 'llama3-8b-8192',
          model: 'llama3-70b-8192',
          temperature: 0,
          top_p: 1,
          stream: false,
          stop: null
      })
  });
  if (response.ok) {
      const data = await response.json();
      console.log(data)
      let message = data.choices[0].message?.content;
      console.log(message);
      if (message.startsWith(prompt)) {
        message = message.slice(prompt.length);
      }
      if (!message.startsWith("\n")) {
        message = "\n" + message
      }
      console.log(message);
      const suggestions = [{text: message, displayText:"groq", description: message}]
      return suggestions
  } else {
      console.error(await response.json());
  }
}
