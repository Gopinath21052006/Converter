from flask import Flask,request,send_file,render_template
from pdf2docx import Converter
from docx2pdf import convert
import os 
app = Flask(__name__)
#defualt 
@app.route('/')
def home():
    return render_template('index.html')



# pdf to covert 
@app.route('/pdf2docx',methods = ['GET','POST'])
def upload_file():
    if request.method == "POST":
        pdf_file = request.files['file']
        name = pdf_file.filename
        pdf_path = os.path.join('pdf',f'{name}.pdf')
        world_path = os.path.join('docx',f'{name}.docx')
        pdf_file.save(pdf_path)
        cv = Converter(pdf_path)
        cv.convert(world_path,start = 0,end =None)
        cv.close()
        return send_file(world_path,as_attachment=True)
    return render_template('pdf2docx.html')

@app.route('/docx2pdf', methods =['GET','POST'] )
def docx2pdf():
    if request.method == 'POST':
        #file to verible
        docx_file = request.files['file']
        #get file name
        name = docx_file.filename
        docx_path=os.path.join('docx',f'{name}.docx')
        pdf_path=os.path.join('pdf',f'{name}.pdf')
        
        docx_file.save(docx_path)
        convert(docx_path,pdf_path)
        return send_file(pdf_path, as_attachment=True)
    return render_template('docx2pdf.html')

        




if __name__ == '__main__':
    app.run(debug=True)
    